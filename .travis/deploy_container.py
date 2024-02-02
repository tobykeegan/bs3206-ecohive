#!/usr/bin/python3

import argparse
import logging
import time
import sys
import socket
import errno
import subprocess
from subprocess import check_output

class DeployHelper:
    '''
    A utility class that enables a new container image to be deployed
    by using its deploy() function.
    '''
    
    def __init__(self, image, branch):
        
        # basic logging configuration
        logging.basicConfig(format='%(asctime)s %(levelname)s: %(message)s', 
                            level=logging.DEBUG, 
                            handlers=[
                                logging.FileHandler('deployments.log'),
                                logging.StreamHandler()
                            ])
        self.log = logging.getLogger(__name__)

        # check the args
        if image not in ["ecohive-ui", "ecohive-api"]:
            self.fail("Image must be either 'ecohive-ui' or 'ecohive-api'.")
        if not branch:
            self.fail("Branch must be specified")
        
        self.image = image
        self.branch = branch
        
        self.ports = {
            "ecohive-ui": 3000,
            "ecohive-api" : 4000
            }
    
        
        
    def deploy(self):
        '''
        Runs the steps required to deploy a new container image 
        to the machine.
            1. Stops any containers running this image
            2. Removes the container from Docker's cache so the name can be used again
            3. Locates a port suitable for the container:
                3000        -> ecohive-ui:latest    (reserved)
                3001-3999   -> ecohive-ui:<branch>
                4000        -> ecohive-api:latest   (reserved)
                4001-4999   -> ecohive-api:<branch>
            4. Starts the new container and performs a crude check to verify it is up.
        '''
        
        container_name = f"{self.image}-{self.branch}"
        self.log.info("======= START DEPLOYMENT of '%s' =======", container_name)
        
        self.docker_ps()
        
        
        self.log.info("Setting up a new instance of %s from branch %s", self.image, self.branch)

        if self.container_is_running(container_name):
            self.log.info("'%s' is running, attempting to stop")
            self.run(f"docker kill {container_name}")
        
        for _ in range(5):
            if not self.container_is_running(container_name):
                self.log.info("Container '%s' successfully stopped", container_name)
                break
            else:
                self.fail(f"Container '{container_name}' could not be stopped")
                
                
        try:
            self.run(f"docker container rm {container_name}")
            self.log.info("Old container successfully removed")
        except subprocess.CalledProcessError as err:
            if err.output.decode() == f'Error response from daemon: No such container: {container_name}\n':
                self.log.info("No dangling container '%s' to remove", container_name)
            else:
                self.log.critical(err.output)
                self.fail(f"Shell command 'docker container rm {container_name} failed. See above output")

        port = self.get_free_port()
        
        
        self.log.info("Starting new container '%s'", container_name)
        
        container_id = self.run(f"docker run -d --name {container_name} -p {port}:3000 {self.image}:{self.branch}")
        
        
        self.log.info("Started container with id '%s'", container_id[:12])
        
        WAIT_TIME = 5
        
        self.log.info("Waiting %d seconds to verify container up", WAIT_TIME)
        time.sleep(WAIT_TIME)
        
        
        if self.container_is_running(container):
            self.log.info("Container appears to be up")
        else:
            self.fail("Container did not appear to start.")
            
        self.docker_ps()
        
        self.log.info("======= START DEPLOYMENT of '%s' =======", container_name)
            
    def run(self, cmd):
        '''
        Wrapper function to run a shell command
        '''
        return check_output(cmd, shell=True, stderr=subprocess.STDOUT).decode()
        
    def fail(self, reason: str):
        '''
        Common utility to bail out of processing for 
        a given reason.
        '''
        self.log.fatal(reason)
        sys.exit(1)
        
    def container_is_running(self, container_name) -> bool:
        '''
        Uses the word count utility to determine if any lines containing 
        the container name are found, which indicates if it is running.
        '''
        running_count = int(self.run(f'docker ps | grep \'{container_name}\' | wc -l'))
        return running_count > 0

    def docker_ps(self):
        '''
        Wrapper function to perform a `docker ps`
        command.
        '''
        self.log.debug("$ docker ps ")
        self.log.debug("\n%s", self.run("docker ps"))

    def get_free_port(self):
        '''
        Locates a free port in the correct range for the image 
        looking to bind to one.
            3000        -> ecohive-ui:latest    (reserved)
            3001-3999   -> ecohive-ui:<branch>
            4000        -> ecohive-api:latest   (reserved)
            4001-4999   -> ecohive-api:<branch>
        '''
        
        # If this is a production image, return the standard port
        if self.branch == 'main':
            return self.ports[self.image]
        
        self.log.info("Image %s:%s is development, getting a free port", self.image, self.branch)
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        # calculate the port range
        min_port = self.ports[self.image] + 1
        max_port = min_port + 999
        
        # try to bind to each port in this range until we find one that is usable
        for port in range(min_port, max_port):
            try:
                s.bind(("127.0.0.1", port))
                usable_port = port
                self.log.info("Found usable port: %d", port)
                break
            except socket.error as e:
                if e.errno == errno.EADDRINUSE:
                    self.log.warning("Port %d is already in use", port)
                else:
                    # something else raised the socket.error exception
                    self.fail(e)
        s.close()
        return usable_port




if __name__ == '__main__':
    parser = argparse.ArgumentParser(
    prog='Deploy Container for Travis',
    description='Deploy a new container from a Travis build',
)
    parser.add_argument('image')
    parser.add_argument('branch')

    args = parser.parse_args()
    
    container = DeployHelper(args.image, args.branch)
    
    container.deploy()
    
    


        

        





