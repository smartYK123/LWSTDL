const cloudinary = require("../cloud");
// const FeaturedPost = require("../models/featuredPost");
// const Post = require("../models/post");
const Elite = require("../models/elite");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const {secretKey} = require('../index')
const secretKey = require("../secret")
// Define the default picture URI
exports.createPost = async (req, res) => {
  console.log('Secret Key:', secretKey);

  try {
    const { token } = req.body;
    console.log('Token:', token);
    console.log('Secret Key:', secretKey);
    const user = jwt.verify(token, secretKey);
    const useremail = user.email;
        // Handle thumbnail file upload
        const pictureResult = await cloudinary.uploader.upload(req.file.path);

        // Construct the new picture object to update in the database
        const newPicture = { uri: pictureResult.secure_url, public_id: pictureResult.public_id };
    
        // Update user data with the new picture
        await Elite.findOneAndUpdate({ email: useremail }, { picture: newPicture });
    
        res.status(200).json({ message: "Picture uploaded successfully", picture: newPicture });
      } catch (error) {
        console.error("Error uploading picture:", error);
        res.status(500).json({ message: "Internal server error" });
      }

};


// Function to set default picture for all users
exports.setDefaultPicture = async (req, res) => {
  try {
    const defaultPictureURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAARVBMVEXk5ueutLcfHx8eHh4dHR0AAAC6vL3p6+xsbW0YGBgaGhoIBwfa3d4VFRUPDg7d4OHP0tS/xMbHy820ub1aWls4ODmXmJhOxJGEAAADvklEQVR4nO3c23KbMBAGYAgEbCJbHNK+/6MWGYix0WF3ddpm+Gfai3Rqf1mJBSSG4oNhitwAXf5HVLX+Wf7S/7vpv2A+6fWHO1SVN0fU7c4i3R51/b6wyJ9uh/ps2oJB2sv9iaqYoIrLvdpQVc0IVS2oihOq3lA1K1TFEFU/UPPodfxQNSPUF8dKfXVqUnGrVKdKdaKcmVEdRxTLSp0oUE4UNCcKmhMFzYmC5kRBExol5zBCtYXox6GZMwxjL31+vVAo2TflS6ZeZEbJcSoPmQZB/LggqP4oWjLQ5lcAlGhMJjWIeVCjmaQy5kA5TPMQpkcNLlNZNqlRzjqRauWHMh52fiovFNCEnu0+KKnpmIbgursPCjDJt+AmuwcKPHjoAfRAWRq5JpgTDh2FKhSuVHQUYkapTIhSkVECZypLxKmZjAL18n0QByAZBe9RW+DjR0WhRw8zflQU8thTgZ8BqSjksacyRUfhOueCAp8AiSjEufgZlijwTCeiCAcfUxT49HeiOKJYzqnYKJZ9imVH53nuY3mVwPJ6iuWVJ89rdPSkSnE3g20K8Ibw6+6QWa4l8Fx1aRFdHd7NPVGFhKNwa/y/bs0T3EGTrg4DLxbQq/sJdhwwy2VhUIC9Gfz2WvRdLMJ+UZD9PstVTK79PrVZaywTbR85zB6y0O0hl3n3kAtVrffd9jH3bvviUo8lTHOaYfTY/w+LWmmPDuD3OaFQbSGF6H8ihPSABUBJ9TjJPGpvc2oexb6nPfjiiVLzyHqzNSlZStTh+RYzDOeibxgBRVvPwrhoKNkTFjjg7Z2Eem+U8HLFQmkfS4IGdoLGotreg7RUy/2LI1GCMJcOLOfcwqHQSy36uMYQgyItCWvjWO2Ao9pAZVpU1pkFRskAs2kf2/0pFCWJrckcyx0FEGW7OaDGfD8IQ5E2GNwqL1SMOj1UhlqBUJFMxnkFQQWf4y4VABWyPx2ibe5uFGEXBhNdb3ei4hx4z+gG0IXCrLbSomntLlS4k7Axx77gQkUvlK5UDlSCQmlaqAOVoFCaUtlRKQqlOQfaUVH75jPvHdSOSjJ6x15lRcW6OnhPIxGoyGeYZwQcFfRWwZoegUo0peam0MJRiabUPKngqHhXnAcUYqKLZEGgcuVEQXOioDlR0LBFsXwDDr8XGG1vVVrfP8Uiry/F+tuwyPdth+o+eeRWb+80U6q6667X6y1j5q/vVD+oft6T91A9XNmivr9eCrWiNlUuV7eSFtNHsb2hsl7SZcn65atpQ6n3ZtZ5s3t95j968IutTColwgAAAABJRU5ErkJggg==";

    const defaultPicture = { uri: defaultPictureURI, public_id: null };

    // Update all users with the default picture
    await Elite.updateMany({}, { picture: defaultPicture });

    res.status(200).json({ message: "Default picture set for all users" });
  } catch (error) {
    console.error("Error setting default picture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
