#!/usr/bin/python3

import argparse
import logging
import time
import socket, errno
from subprocess import check_output

class DeployHelper:
    
    def __init__(self, image, branch):

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
    
        
        
    def deploy(self):
        self.log.info("======= START DEPLOYMENT =======")
        self.docker_ps()
        self.log.info("Setting up a new instance of %s from branch %s", self.image, self.branch)
        
        container_name = f"{self.image}-{self.branch}"
        
        self.log.debug("Container name will be '%s'", container_name)

        try:
            self.run(f"docker stop {container_name}")
        except:
            self.log.warning("Container %s was not running.", container_name)
        
        try:
            self.run(f"docker container rm {container_name}")
        except:
            self.log.warning("No dangling container '{container_name}' to remove")

        port = self.get_free_port()
        self.log.info("Starting new container:")
        self.log.info(self.run(f"docker run -d --name {container_name} -p {port}:3000 {self.image}:{self.branch}"))
        time.sleep(3)
        
        if self.run(f'docker ps | grep {self.image}:{self.branch} | awk \'{{print $1}}\''):
            self.log.info("Container appears to be up")
        else:
            self.fail("Container did not appear to start.")
            
        self.docker_ps()
        
        self.log.info("======= FINISH DEPLOYMENT =======")
            
    def run(self, cmd):
        return check_output(cmd, shell=True).decode()
        
    def fail(self, reason: str):
        self.log.fatal(reason)
        exit(1)

    def docker_ps(self):
        self.log.debug("$ docker ps ")
        self.log.debug("\n" + self.run("docker ps"))

    def get_free_port(self):
        self.log.info("Getting a free port")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        for port in range(3000,4000):
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
    
    


        

        




