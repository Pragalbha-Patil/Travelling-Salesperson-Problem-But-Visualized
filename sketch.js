var cities = [];
var totalCities = 5;
var possibleCombinations = factorial(totalCities);
var recordDistance;
var bestPath;

function setup() {
  createCanvas(400, 300);
  frameRate(30);
  
  //fill cities with random points that'll change everytime
  for(var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
  }
  
  console.log("Salesman can take "+possibleCombinations+" possible paths");
  // calculates distance between the cities intially
  var d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();
}

function draw() {
  background(0); // black bg
  fill(255); // fill whatever you draw with white
  
  // strokeWeight(0);
  // textSize(16);
  // textStyle(BOLD);
  // text('White indicates all possible paths', 20, 20);
  // text('Green indicates optimal path', 20, 40);
  
  for(var i = 0; i < cities.length; i++) {
    // draw circles indicating vertices
    ellipse(cities[i].x, cities[i].y, 8,8);
  }
  
  // initial path the salesman takes
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(i = 0; i < cities.length; i++){
    // draws edges between vertices
    vertex(cities[i].x, cities[i].y);  
  }
  endShape();
  
  // best path
  drawBestPath(bestEver);
  
  // randomize points to explore all possible paths salesman can take
  i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities, i, j);
  
  // calc. distance between random points
  var d = calcDistance(cities);
  
  // records the distance if the calculated point is less than what initially was
  if( d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice(); // take a copy of the best paths array
    console.log("Updating path...");
    console.log("Optimal path for now: "+round(recordDistance));
  }
  
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points) {
  var sum = 0;
  for(var i = 0; i < points.length - 1; i++){
    var d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    sum = d;
  }
  return sum;
}

function drawBestPath(cities) {
  // optimal path the salesman takes
  stroke(0, 255, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for(i = 0; i < cities.length; i++){
    vertex(bestEver[i].x, bestEver[i].y);  
  }
  endShape();
  // end
}

function factorial(n){
  if(n==1) {
	return(1);
  }
  else {
    return(n*factorial(n-1));
  } 
}