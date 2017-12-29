var mattRover = { //tested
  position: [0,0],
  direction:  'N'
};

var theWorld = {
  grid:
    [
    [0,1,2,3,4,5,6,7,8,9,10],
    [0,1,2,3,4,5,6,7,8,9,10]
                        ]
};

function positionWrap(rover, boundary, world) {
      switch(boundary) {
        case 'n':
          rover.position[0] = 0;
          break;
        case 'e':
          rover.position[1] = 0;
          break;
        case 's':
          rover.position[0] = world.grid[0].length-1;
          break;
        case 'w':
          rover.position[1] = world.grid[1].length-1;
          break;
      }
}

function edge(rover, world) { //Did rover just cross the edge?: TRUE
  if (rover.position[0] > world.grid[0].length-1) //north
    {return 'n';}
  else if  (rover.position[0] < 0) //south
    {return 's';}
  else if (rover.position[1] > world.grid[1].length-1)
    {return 'e';} //east
  else if (rover.position[1] < 0) //west
    {return 'w';}
    else {
  return false;
  }
}

function move(rover, fb, world) { //tested
    if (fb === 'f' && edge(rover, world) === false) {
                            switch(rover.direction) {
                              case 'N':
                                 rover.position[0]++;
                                break;
                              case 'E':
                                rover.position[1]++;
                                break;
                              case 'S':
                                rover.position[0]--;
                                break;
                              case 'W':
                                rover.position[1]--;
                                break;
                            }
                                    if (edge(rover, world) !== false){
                                      var boundary = edge(rover, world);
                                      positionWrap(rover, boundary, world);
                                    }
    }
    else if (fb === 'b' && edge(rover, world) === false) {
                            switch(rover.direction) {
                              case 'N':
                                rover.position[0]--;
                                break;
                              case 'E':
                                rover.position[1]--;
                                break;
                              case 'S':
                                rover.position[0]++;
                                break;
                              case 'W':
                                rover.position[1]++;
                                break;
                              } //switch close
                                    if (edge(rover, world) !== false){
                                      var boundary = edge(rover, world);
                                      positionWrap(rover, boundary, world);
                                    }
    } //else if 1 close
    else if (edge(rover, world) !== false){
      var boundary = edge(rover, world);
      positionWrap(rover, boundary, world);
    }
    else {
      console.log("INVALID COMMAND! b");
    } //else close

} //func close

function turn (rover, rl) { //tested
    switch(rover.direction) {
      case 'N':
        if (rl === 'r') {
          rover.direction = 'E';
        } else if (rl === 'l') {
          rover.direction = 'W';
        }
        break;
      case 'E':
        if (rl === 'r') {
          rover.direction = 'S';
        } else if (rl === 'l') {
          rover.direction = 'N';
        }
        break;
      case 'S':
        if (rl === 'r') {
          rover.direction = 'W';
        } else if (rl === 'l') {
          rover.direction = 'E';
        }
        break;
      case 'W':
        if (rl === 'r') {
          rover.direction = 'N';
        } else if (rl === 'l') {
          rover.direction = 'S';
        }
        break;
    }
}

function status (mattRover) { //tested
  console.log("Matt's Rover is at " + mattRover.position + " - facing " + mattRover.direction);
}

function go (userCommands) { //tested
//creation of userArray
var userArray = Array.from(userCommands);

      //loop through array to perform actions
      var i = 0;
      while (i <= userArray.length-1) {
              if (userArray[i] === 'r' || userArray[i] === 'l') {
                      turn(mattRover, userArray[i]);

                  } else if (userArray[i] === 'f' || userArray[i] === 'b') {
                      move(mattRover, userArray[i], theWorld);
                  } else {
                      console.log("YOUR INSTRUCTIONS CONTAINED AN INVALID COMMAND! Only f, b, r and l will control the rover!");
                      break;
                  }
              i++;
      }
  status(mattRover);//report Rover status to the user.
}

//initialisation
status(mattRover);
