
function nextGen(){

  calculateFitness()

  //This just regenerates new rovers, but we want from prev gen
  //rovers[i] = new Vehicle(random(width), height - 25, random(0, TWO_PI))

  //This is a simplified gen alg that instead of crossover,
  // takes only the best one and copies it
  rovers = pickOne()
  genNb += 1
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
    children.push(new Vehicle(random(width), height - 25, random(0, TWO_PI),chosenRover.brain))
    children[i].mutate(1)
  }
  return children
}

function calculateFitness(){
  let sum = 0
  for (let rover of savedRovers){
    //dv is the distance from goal
    sum += rover.dv
  }
  for (let rover of savedRovers){
    rover.fitness = 1 - rover.dv / sum
  }
}
