(function () {
    /*
    * Interfaces
    */
    // random integer generator between min and max inclusive to be used for travel's food
    //  found this by googling random # 1 to 10 on MDN (Math.random)
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
    /*
   * Classes
   */
    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    var Traveler = /** @class */ (function () {
        function Traveler(name, food, isHealthy) {
            if (food === void 0) { food = getRandomIntInclusive(1, 100); }
            if (isHealthy === void 0) { isHealthy = true; }
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }
        Traveler.prototype.hunt = function () {
            //  randomly generate a hunt success result
            var huntResult = getRandomIntInclusive(1, 100);
            //  if result bigger than 50, then add 100 food points
            if (huntResult > 50) {
                this.food = this.food + 100;
            }
            return this.food;
        };
        Traveler.prototype.eat = function () {
            //  only eat if traveler has at least 20 food points
            if (this.food >= 20) {
                this.food = this.food - 20;
            }
            else {
                //  traveler trying to eat with less than 20 food points, so is now unhealthy
                this.isHealthy = false;
                this.food = 0; //  assume traveler ate what little food they had left
            }
            return this.isHealthy;
        };
        return Traveler;
    }());
    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    var Wagon = /** @class */ (function () {
        function Wagon(capacity, passengerArray) {
            this.capacity = capacity;
            this.passengerArray = passengerArray;
        }
        Wagon.prototype.addPassenger = function (joinTraveler) {
            var returnMessage;
            //  check if passengers length is less than wagon capacity
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(joinTraveler); //  now push the traveler onto the passengers array
                returnMessage = "Successfully added " + joinTraveler.name + " to the wagon as there was room";
            }
            else {
                returnMessage = "Could not add " + joinTraveler.name + " to the wagon  as it was already full";
            }
            return returnMessage;
        };
        Wagon.prototype.isQuarantined = function () {
            //  initialize boolean to false
            var isQuarantine = false;
            //  loop through passenger array
            for (var i = 0; i < this.passengerArray.length; i++) {
                if (this.passengerArray[i].isHealthy === false) {
                    //  somebody was sick, so set boolean to true
                    isQuarantine = true;
                    break;
                }
            }
            return isQuarantine;
        };
        Wagon.prototype.getFood = function () {
            //  initialize foodCount to 0
            var foodCount = 0;
            //  loop through the passengers arry
            for (var i = 0; i < this.passengerArray.length; i++) {
                //  increment foodCount by current passenger's food
                foodCount = foodCount + this.passengerArray[i].food;
            }
            return foodCount;
        };
        return Wagon;
    }());
    /*
    * Play the game
    *
    * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    *
    * Create wagon with an empty passenger list and a capacity of 4.
    *
    * Make 3 of 5 the travelers eat by calling their eat methods
    *
    * Make the remaining 2 travelers hunt
    *
    * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.
    *
    * Run the isQuarantined method for the wagon
    *
    * Run the getFood method for the wagon
    *
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects
    *
    */
    //  create 5 new travelers   
    var traveler1 = new Traveler("Jordan");
    var traveler2 = new Traveler("AJ");
    var traveler3 = new Traveler("Rudy");
    var traveler4 = new Traveler("Lyndsy");
    var traveler5 = new Traveler("Sarah");
    // output 5 travelers
    console.log(traveler1);
    console.log(traveler2);
    console.log(traveler3);
    console.log(traveler4);
    console.log(traveler5);
    // create new wagon
    var wagon1 = new Wagon(4, []);
    // ouput wagon results
    console.log(wagon1);
    // 3 travelers eat, output results
    console.log(traveler1.name + " just ate and now has a health value of: " + traveler1.eat());
    console.log(traveler1);
    console.log(traveler2.name + " just ate and now has a health value of: " + traveler2.eat());
    console.log(traveler2);
    console.log(traveler3.name + " just ate and now has a health value of: " + traveler3.eat());
    console.log(traveler3);
    // 2 travelers hunt, output results
    console.log(traveler4.name + " just hunted and now has a food value of: " + traveler4.hunt());
    console.log(traveler4);
    console.log(traveler5.name + " just hunted and now has a food value of: " + traveler5.hunt());
    console.log(traveler5);
    // set array of 4 travelers
    var newTravelerArray = [traveler1, traveler2, traveler3, traveler4];
    // loop through array, giving each member a 50% chance of getting on the wagon
    newTravelerArray.forEach(function (traveler) {
        if (getRandomIntInclusive(1, 100) > 50) {
            console.log(wagon1.addPassenger(traveler));
        }
    });
    // output current state of wagon
    console.log(wagon1);
    // check quarentine state of wagon and output result
    console.log("Is the wagon quarantined: " + wagon1.isQuarantined());
    // check total food on wagon and output result
    console.log("The total amount of food on the wagon is: " + wagon1.getFood());
})();
