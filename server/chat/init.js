const initSocket = function(io) {
  io.on("connection", socket => {
    console.log("connected")
  })
}

module.exports = initSocket
