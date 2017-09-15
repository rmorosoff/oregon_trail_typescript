(function(){

    /*
    * Interfaces
    */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt(): number;

        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;


    }

    //interface describing attributes and methods a wagon should have
    interface IWagon{
        capacity: number;
        passengerArray: Traveler[];

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }

   
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
    class Traveler implements ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        constructor(name: string, food: number = getRandomIntInclusive(1, 100), isHealthy: boolean = true){
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }
        hunt() {
            //  randomly generate a hunt success result
            let huntResult = getRandomIntInclusive(1, 100);
            //  if result bigger than 50, then add 100 food points
            if (huntResult > 50) {
            this.food = this.food + 100;
            } 
            return this.food
        }

        eat() {
            //  only eat if traveler has at least 20 food points
            if (this.food >= 20) {
                this.food = this.food - 20;
            } else {
                //  traveler trying to eat with less than 20 food points, so is now unhealthy
                this.isHealthy = false;
                this.food = 0;  //  assume traveler ate what little food they had left
            }
            return this.isHealthy
        }

    }

    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {
        capacity: number;
        passengerArray: Traveler[];

        constructor(capacity: number, passengerArray: Traveler[]){
            this.capacity = capacity;
            this.passengerArray = passengerArray;
        }

        addPassenger(joinTraveler: Traveler) {
            let returnMessage;
            //  check if passengers length is less than wagon capacity
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(joinTraveler);  //  now push the traveler onto the passengers array
                returnMessage = "Successfully added " + joinTraveler.name + " wagon as there was room"
            } else {
                returnMessage =  "Could not add " + joinTraveler.name + " to the wagon  as it was already full"
            }
            return returnMessage
        }

        isQuarantined() {
            //  initialize boolean to false
            let isQuarantine = false;
            //  loop through passenger array
            for (let i=0; i < this.passengerArray.length; i++){
            if (this.passengerArray[i].isHealthy === false) {
                //  somebody was sick, so set boolean to true
                isQuarantine = true;
                break;
            }
            }
            return isQuarantine;

        }

        getFood() {
            //  initialize foodCount to 0
            let foodCount = 0;
            //  loop through the passengers arry
            for (let i=0; i < this.passengerArray.length; i++) {
            //  increment foodCount by current passenger's food
            foodCount = foodCount + this.passengerArray[i].food;
            }
            return foodCount;
        }

    }

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
        let traveler1 = new Traveler("Jordan");
        let traveler2 = new Traveler("AJ");
        let traveler3 = new Traveler("Rudy");
        let traveler4 = new Traveler("Lyndsy");
        let traveler5 = new Traveler("Sarah");

        // output 5 travelers
        console.log(traveler1);
        console.log(traveler2);
        console.log(traveler3);
        console.log(traveler4);
        console.log(traveler5);


        // create new wagon
        let wagon1 = new Wagon(4, []);

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
        let newTravelerArray = [traveler1, traveler2, traveler3, traveler4];

        // loop through array, giving each member a 50% chance of getting on the wagon
        newTravelerArray.forEach(traveler => {
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