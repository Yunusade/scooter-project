class Scooter{
  // scooter code here
  static nextSerial = 1
  constructor(station){
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 0
    this.isBroken = false
  }

  rent(user) {
    if(this.charge > 20 && !this.isBroken){
      this.station = null
      this.user = user
    }else{
      throw new Error("scooter needs to charge or scooter needs repair")
    }
  }

  dock(station) {
    this.station = station;
    this.user = null
  }
  
  async recharge() {
    let difference = 100 - this.charge;
    if(difference === 0) throw new Error("Scooter is already 100%")

    for(let i = 0; i < difference; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.charge = this.charge + 1

      if(this.charge % 3 === 0) console.log(`Scooter is charged ${this.charge}%`)
    }
  }

  requestRepair() {
    if(this.isBroken !== true){
      throw new Error("Your scooter doesn't need a repair")
    }

    setTimeout(() => {
      this.isBroken = false
      console.log("Repair Completed")
    }, 5000);
  }

}


module.exports = Scooter
