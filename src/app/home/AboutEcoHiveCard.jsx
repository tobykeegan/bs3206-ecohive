import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import styles from '@/styles/home';

/**
 * Card for the Home page to display information about the EcoHive.
 * @author Jade Carino
 */
export default function AboutEcoHiveCard() {
  return (
    <div
      id="About-EcoHive"
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card
        id="About-EcoHive-Card"
        variant="plain"
        sx={{
          maxWidth: 960,
          backgroundColor: 'white',
        }}
      >
        <Typography id="About-EchoHive-Heading" level="title-lg">
          About EcoHive
        </Typography>
        <Typography id="About-EcoHive-Text" level="body-md">
          Welcome to EcoHive, where eco warriors unite to swarm together,
          buzzing with excitement as they connect, arrange, and attend events
          aimed at nurturing our planet and combating climate change! 🐝🌍
          <Typography id="Hashtag">#JoinTheHive</Typography>
        </Typography>
        <Typography id="About-EcoHive-Text" level="body-md">
          At EcoHive, our mission is twofold: to empower eco-conscious
          individuals and organizations in their collective effort to combat
          climate change, while fostering a vibrant community dedicated to
          sustainability. Through our platform, users can connect, organize, and
          participate in events geared towards environmental action, all while
          earning rewards for their contributions. We believe in the power of
          community-driven solutions to create a more sustainable future for our
          planet and generations to come.
        </Typography>
        <Typography id="About-EcoHive-Text" level="body-md">
          Join us in our mission to make a positive impact on the world!
        </Typography>
      </Card>
    </div>
  );
}
