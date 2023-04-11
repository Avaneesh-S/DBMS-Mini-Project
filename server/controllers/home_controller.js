const express = require("express");

const User = require("../models/UserModel");
const Blog = require("../models/BlogModel");
const { ObjectId } = require("mongodb");

const home =(req, res) => {
  const present_user_email = req.body.email_login;

  let user_details = [];

  User.collection
    .find({ EmailId: present_user_email })
    .forEach((user) => user_details.push(user))
    .then(() => {
      const blogs = [];
      
      if (typeof(user_details[0].Friends) !== "undefined") {
        Blog.collection
          .find({ Owner: { $in: user_details[0].Friends } })
          .forEach((blog) => blogs.push(blog))
          .then(async() => {
            
            const blog_owners=[]
            for(let i=0;i<blogs.length;i++)
            {
              const user=await User.collection.findOne({_id:new ObjectId(blogs[i].Owner)})
              blog_owners.push(user.EmailId)
            }
            
            //console.log("blog owners :",blog_owners)
            res.json({ all_blogs: blogs ,all_owners:blog_owners});
            
            
          });
      } else {
        res.json({ all_blogs: blogs });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { home };
