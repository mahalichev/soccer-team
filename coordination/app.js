const Agent = require('./agent')
const VERSION = 7

class PlayerData{
    constructor(x, y, side, isGoalie = false){
        this.x = x
        this.y = y
        this.side = side
        this.isGoalie = isGoalie
    }

    getSocketPosition = () => {
        let x = this.x * ((this.side == "r") ? -1 : 1)
        let y = this.y * ((this.side == "r") ? -1 : 1)
        return `${x} ${y}`
    }
}

const Teams = {
    "l": "LeftTeam",
    "r": "RightTeam"
}

const Players = [
    new PlayerData(-15, -10, "l"),
    new PlayerData(-20, -20, "l"),
    new PlayerData(52.5, -7, "r"),
    new PlayerData(52.5, 7, "r")
]

function initAgent(player){
    let agent = new Agent(player, Teams[player.side])
    require('./socket')(agent, Teams[player.side], VERSION)
    setTimeout(() => agent.socketSend("move", `${player.getSocketPosition()}`), 500)
}

const start = () => {for (let index in Players) initAgent(Players[index])}

start()
