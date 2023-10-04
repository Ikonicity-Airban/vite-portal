function four_oh_four(req, res) {
  res.status(404).json({
    msg: `${req.path.replace("/", "")} page is not found`,
  });
}

module.exports = four_oh_four;
