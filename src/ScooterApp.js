const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = { "Station A": [], "Station B": [], "Station C": [] };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (!this.registeredUsers.hasOwnProperty(username) && age >= 18) {
      const newUser = new User(username, password, age);
      this.registeredUsers[username] = newUser;
      console.log("user has been registered");
      return newUser;
    } else if (age < 18) {
      throw new Error("too young to register");
    } else {
      throw new Error("already registered");
    }
  }

  loginUser(username, password) {
    if (this.registeredUsers.hasOwnProperty(username)) {
      const user = this.registeredUsers[username];

      if (user.password === password) {
        console.log("user has been logged in.");
      } else {
        throw new Error("Username or password is incorrect.");
      }
    } else {
      throw new Error("Username or password is incorrect.");
    }
  }

  logoutUser(username) {
    if (this.registeredUsers.hasOwnProperty(username)) {
      console.log("user is logged out");
    } else {
      throw new Error("no such user is logged in");
    }
  }

  createScooter(station) {
    if (this.stations.hasOwnProperty(station)) {
      const newScooter = new Scooter(station);
      this.stations[station].push(newScooter);
      console.log("created new scooter");
      return newScooter;
    } else {
      throw new Error("no such station error");
    }
  }

  dockScooter(scooter, station) {

    if(this.stations[station].includes(scooter)){
      throw new Error("scooter already at station")
    }

    if (this.stations.hasOwnProperty(station)) {
      this.stations[station].push(scooter);
      scooter.dock(station);
      console.log("scooter is docked");
    }else{
      throw new Error("no such station error");
    }

  }

  rentScooter(scooter, user) {
    for (const station in this.stations) {
        const stationScooters = this.stations[station];
        const scooterIndex = stationScooters.indexOf(scooter);
        if (scooterIndex !== -1) {
          if (scooter.user === null) {
              stationScooters.splice(scooterIndex, 1);
              scooter.rent(user);
              console.log(`${user.username} has rented a scooter from ${station}`);
              return;
          } else {
              throw new Error(`Scooter already rented by ${scooter.user.username}`);
          }
        }
    }
  }

  print() {
    console.log(this.registeredUsers())
    console.log(this.stations())
    for(const station in this.stations){
      console.log(`station has ${station.length} scooters`)
    }
  }

  // ScooterApp code here
}

module.exports = ScooterApp;
