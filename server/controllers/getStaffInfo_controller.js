const express = require("express");
const con=require('../config/dbConn')

const data = async (req, res) => {
  const branchNo = req.params.branchName; // Assuming branch number is passed as a parameter in the request URL
    con.query(`select * from Staff where branchNo = '${branchNo}'`, (error, result, fields) => {
      if (error) {
        console.log(error)
        res.json({ mssg: "FAILED" })
      } else {
        console.log(result)
        res.json(result)
      }
    })
  }

  module.exports = {data};
