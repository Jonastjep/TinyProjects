
function nextGen(){

  calculateFitness()

  // // For debugging the fitness
  // for (let rover of savedRovers){
  //   console.log(rover.fitness)
  // }

  //This just regenerates new rovers, but we want from prev gen
  //rovers[i] = new Vehicle(random(width), height - 25, random(0, TWO_PI))

  //This is a simplified gen alg that instead of crossover,
  // takes only the best one and copies it
  rovers = pickOne()
  genNb += 1

  for (var i = 0; i < savedRovers.length; i++) {
    savedRovers[i].dispose()
  }
  savedRovers = []

  // TODO: make a pickTwo/Three that combines them with crossover

}

//returns an array of new rovers with the brain of the Chosen one
function pickOne(){
  var index = 0
  var r = random(1)

  while (r>0){
    r = r - savedRovers[index].fitness
    index++;
  }
  index--;

  let chosenRover = savedRovers[index]
  let children = []
  for(let i = 0; i < popSize; i++){
    children.push(new Vehicle(random(20, width-20), height - 25, random(0, TWO_PI),chosenRover.brain))
    children[i].mutate(0.1)
  }
  return children
}

function calculateFitness(){
  // Normalize the values
  let sum = 0
  for (let rover of savedRovers){
    rover.calculateFitness()
    // console.log(rover.fitness)
    sum += rover.fitness
  }
  for (let rover of savedRovers){
    if(rover.fitness<=0){
      rover.fitness = 0
    }
    rover.fitness = rover.fitness / sum
    // console.log(rover.fitness)
  }
// console.log("_______________________")
}
