import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../../../images/me.png";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/sceptervin/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{
                width: "10vmax",
                height: "10vmax",
                margin: "2vmax 0",
                borderRadius: "none",
              }}
              src={logo}
              alt="Founder"
            />
            <Typography className="al" >Aravind Lingala</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @aravind Only with the purpose to
              learn MERN stack .
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.linkedin.com/in/aravind191999/" target="blank">
              <LinkedInIcon className="linkdeinSvgIcon" />
            </a>

            <a href="https://www.instagram.com/sceptervin/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>

            <a href="https://www.youtube.com/" target="blank">
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
