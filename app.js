let LEFT_KEY = 65;
let RIGHT_KEY = 68;
let UP_KEY = 87;
let DOWN_KEY = 83;
let SPACE_KEY = 32;
let LASER_MOVEMENT = 10;

let lastLoopRun = 0;
let iterations = 0;
let score = 0;
let levelCount = ["Noob", "Average", "Above Average", "Skilled", "Pro", "Expert"];
let enemies = [];
let randomSpawnNum;
let randomSpawn;
let randomSpawnDiv;
let enemiesLength;
let enemy;
let enemyY;
let enemyX;
let spawnStyle;
let previousEnemy;

let e_laserLeft = document.getElementById("laser_left");
let e_laserUp = document.getElementById("laser_up");
let e_laserRight = document.getElementById("laser_right");
let e_laserDown = document.getElementById("laser_down");
let soldierDiv = document.getElementById("soldier");
let spawns = document.getElementsByClassName("spawn");
let scoreDiv = document.getElementById("score");
let gameOverDiv = document.getElementById("gameover");
let finalScoreDiv = document.getElementById("finalScore")
let levelCountDiv = document.getElementById("levelcount")
let enemy_style;


let controller = new Object();

// Skeleton for sprites
function createSprite(element, x, y, w, h, released) {
    let result = new Object();
    result.element = element;
    result.x = x;
    result.y = y;
    result.w = w;
    result.h = h;
    result.released = released;
    return result;
}

function createSpawn(element, x, y, w, h) {
    let createdSpawn = new Object();
    createdSpawn.element = element;
    createdSpawn.x = x;
    createdSpawn.y = y;
    createdSpawn.w = w;
    createdSpawn.h = h;
    return createdSpawn;
}

function createEnemy(element, x, y, w, h, alive) {
    let createdEnemy = new Object();
    createdEnemy.element = element;
    createdEnemy.x = x;
    createdEnemy.y = y;
    createdEnemy.w = w;
    createdEnemy.h = h;
    createdEnemy.alive = alive;
    return createdEnemy;
}

function giveNewEnemyAttributes() {
    randomSpawnNum = Math.floor(Math.random() * 4);
    randomSpawnDiv = spawns[randomSpawnNum]
    randomSpawn = randomSpawnDiv.getAttribute("id");
    enemiesLength = enemies.length.toString();
    enemyDiv = document.createElement("div");
    enemyDiv.setAttribute("class", "enemy");
    enemyDiv.setAttribute("id", enemiesLength)
    document.body.appendChild(enemyDiv);
    enemyDiv = document.getElementsByClassName("enemy")
    enemies.push(enemyDiv[enemiesLength])
    spawnStyle = getComputedStyle(randomSpawnDiv);
    enemyY = parseInt(spawnStyle.top) + 33;
    enemyX = parseInt(spawnStyle.left) + 33;
    enemy_style = document.getElementById(enemiesLength);
    return enemies, enemyDiv, enemiesLength, spawnStyle, randomSpawn, enemyX, enemyY, randomSpawnNum, enemy_style;
}
giveNewEnemyAttributes();

function showScore() {
    scoreDiv.innerHTML = "Score: " + score;
}

function showLevel() {
    if(score >= 0 || score === 0) {
        levelCountDiv.innerHTML = "Difficulty: " + levelCount[0]
    };
    if(score >= 5){
        levelCountDiv.innerHTML = "Difficulty: " + levelCount[1]
    };
    if(score >= 10){
        levelCountDiv.innerHTML = "Difficulty: " + levelCount[2]
    };
    if(score >= 15){
        levelCountDiv.innerHTML = "Difficulty: " + levelCount[3]
    };
    if(score >= 20){ 
        levelCountDiv.innerHTML = "Difficulty: " + levelCount[4]
    };
    if(score >= 25){
        levelCountDiv.innerHTML = "Difficulty: " + levelCount[5]
    };
}
showLevel();

function keyToggle(keyCode, isPressed) {
    console.log(keyCode)
    if (keyCode == LEFT_KEY) {
        controller.left = isPressed;
    };
    if (keyCode == RIGHT_KEY) {
        controller.right = isPressed;
    }
    if (keyCode == UP_KEY) {
        controller.up = isPressed;
    }
    if (keyCode == DOWN_KEY) {
        controller.down = isPressed;
    }
    if (keyCode == SPACE_KEY) {
        controller.space = isPressed;
    }
}


// ensureBounds() IS NOT BEING USED RIGHT NOW
// Delete this comment when it is being used
function ensureBounds(sprite, ignoreY) {
    if (sprite.x < 20) {
        sprite.x = 20;
    }
    if (!ignoreY && sprite.y < 20) {
        sprite.y = 20;
    }
    if (sprite.x + sprite.w > 500) {
        sprite.x = 500 - sprite.w;
    }
    if (!ignoreY && sprite.y + sprite.h > 500) {
        sprite.y = 500 - sprite.h;
    }
}

function intersects(first, second) {
    return first.x < second.x + second.w && first.x + first.w > second.x && first.y < second.y + second.h && first.y + first.h > second.y;
}

function handleControls() {
    if (soldierDiv.style.visibility !== "hidden") {
        if (controller.left) {
            e_laserLeft.style.visibility = "visible";
            laser_left.released = true;
        }

        if (controller.right) {
            e_laserRight.style.visibility = "visible";
            laser_right.released = true;
        }

        if (controller.up) {
            e_laserUp.style.visibility = "visible";
            laser_up.released = true;
        }

        if (controller.down) {
            e_laserDown.style.visibility = "visible";
            laser_down.released = true;
        }
    }

}

function setPosition(sprite) {
    let e = document.getElementById(sprite.element);
    e.style.left = sprite.x + "px";
    e.style.top = sprite.y + "px";
}

function updatePositions() {
    if (laser_up.released) {
        laser_up.y -= 12;
    }

    if (laser_down.released) {
        laser_down.y += 12
    }

    if (laser_left.released) {
        laser_left.x -= 12;
    }

    if (laser_right.released) {
        laser_right.x += 12;
    }

    if (randomSpawnNum === 1) {
        if (soldierDiv.style.visibility !== "hidden") {
            newEnemy.x -= 4;
            if(score >= 5) {
                newEnemy.x -= 5;
            }
            if(score >= 10) {
                newEnemy.x -= 5.5;
            }
            if(score >= 15) {
                newEnemy.x -= 6;
            }
            if(score >= 20) {
                newEnemy.x -= 6.5;
            }
            if(score >= 25) {
                newEnemy.x -= 7;
            }
            if(score >= 30) {
                newEnemy.x -= 7.5;
            }
        }
    }

    if (randomSpawnNum === 0) {
        if (soldierDiv.style.visibility !== "hidden") {
            newEnemy.y += 4
            if(score >= 5) {
                newEnemy.y += 5;
            }
            if(score >= 10) {
                newEnemy.y += 5.5;
            }
            if(score >= 15) {
                newEnemy.y += 6;
            }
            if(score >= 20) {
                newEnemy.y += 6.5;
            }
            if(score >= 25) {
                newEnemy.y += 7;
            }
            if(score >= 30) {
                newEnemy.y += 7.5;
            }
        }

    }

    if (randomSpawnNum === 2) {
        if (soldierDiv.style.visibility !== "hidden") {
            newEnemy.y -= 4;
            if(score >= 5) {
                newEnemy.y -= 5;
            }
            if(score >= 10) {
                newEnemy.y -= 5.5;
            }
            if(score >= 15) {
                newEnemy.y -= 6;
            }
            if(score >= 20) {
                newEnemy.y -= 6.5;
            }
            if(score >= 25) {
                newEnemy.y -= 7;
            }
            if(score >= 30) {
                newEnemy.y -= 7.5;
            }
        }

    }

    if (randomSpawnNum === 3) {
        if (soldierDiv.style.visibility !== "hidden") {
            newEnemy.x += 4;
            if(score >= 5) {
                newEnemy.x += 5;
            }
            if(score >= 10) {
                newEnemy.x += 5.5;
            }
            if(score >= 15) {
                newEnemy.x += 6;
            }
            if(score >= 20) {
                newEnemy.x += 6.5;
            }
            if(score >= 25) {
                newEnemy.x += 7;
            }
            if(score >= 30) {
                newEnemy.x += 7.5;
            }
        }
    }

    if (intersects(laser_down, enemySpawnDown)) {
        laser_down.x = 240;
        laser_down.y = 230;
        e_laserDown.style.visibility = "hidden";
        laser_down.released = false;
    }

    if (intersects(laser_up, enemySpawnUp)) {
        laser_up.x = 240;
        laser_up.y = 230;
        e_laserUp.style.visibility = "hidden";
        laser_up.released = false;
    }

    if (intersects(laser_right, enemySpawnRight)) {
        laser_right.x = 243;
        laser_right.y = 240;
        e_laserRight.style.visibility = "hidden"
        laser_right.released = false;
    }

    if (intersects(laser_left, enemySpawnLeft)) {
        laser_left.x = 230;
        laser_left.y = 240;
        e_laserLeft.style.visibility = "hidden";
        laser_left.released = false;
    }

    if (intersects(newEnemy, laser_left)) {
        score++;
        showLevel();
        previousEnemy = document.getElementById(enemiesLength);
        laser_left.x = 230;
        laser_left.y = 240;
        e_laserLeft.style.visibility = "hidden";
        laser_left.released = false;
        previousEnemy.parentNode.removeChild(previousEnemy);
        giveNewEnemyAttributes();
        newEnemy = createEnemy(enemiesLength, enemyY, enemyX, 30, 30, true)
    }

    if (intersects(newEnemy, laser_right)) {
        showLevel();
        score++;
        previousEnemy = document.getElementById(enemiesLength);
        laser_right.x = 243;
        laser_right.y = 240;
        e_laserRight.style.visibility = "hidden"
        laser_right.released = false;
        previousEnemy.parentNode.removeChild(previousEnemy);
        giveNewEnemyAttributes();
        newEnemy = createEnemy(enemiesLength, enemyY, enemyX, 30, 30, true);
    }

    if (intersects(newEnemy, laser_up)) {
        showLevel();
        score++;
        previousEnemy = document.getElementById(enemiesLength);
        laser_up.x = 240;
        laser_up.y = 230;
        e_laserUp.style.visibility = "hidden";
        laser_up.released = false;
        previousEnemy.parentNode.removeChild(previousEnemy);
        giveNewEnemyAttributes();
        newEnemy = createEnemy(enemiesLength, enemyY, enemyX, 30, 30, true);
    }

    if (intersects(newEnemy, laser_down)) {
        showLevel();
        score++;
        previousEnemy = document.getElementById(enemiesLength);
        laser_down.x = 240;
        laser_down.y = 243;
        e_laserDown.style.visibility = "hidden";
        laser_down.released = false;
        previousEnemy.parentNode.removeChild(previousEnemy);
        giveNewEnemyAttributes();
        newEnemy = createEnemy(enemiesLength, enemyY, enemyX, 30, 30, true);
    }

    if (intersects(soldier, newEnemy)) {
        soldierDiv.style.visibility = "hidden";
        gameOverDiv.style.visibility = "visible";
        finalScoreDiv.innerHTML = "Final Score: " + score;
        finalScoreDiv.style.visibility = "visible";
        newEnemy = createEnemy(enemiesLength, enemyY, enemyX, 30, 30, false)
        newEnemy.visibility = "hidden"
        enemy_style = document.getElementById(enemiesLength);
        enemy_style.style.visibility = "hidden";
        scoreDiv.style.visibility = "hidden";
        levelCountDiv.style.visibility = "hidden"
    }
}

function showSprites() {
    setPosition(soldier);
    setPosition(laser_left)
    setPosition(laser_up)
    setPosition(laser_down)
    setPosition(laser_right)
    setPosition(newEnemy)
}

function loop() {
    if (new Date().getTime() - lastLoopRun > 40) {
        handleControls();
        updatePositions();
        showSprites();
        showScore();
        lastLoopRun = new Date().getTime();
        iterations++;
    }
    setTimeout("loop();", 2)
}

document.onkeydown = function (event) {
    keyToggle(event.keyCode, true)
}

document.onkeyup = function (event) {
    keyToggle(event.keyCode, false)
}

// createSpawn(element, x, y, w, h)
let enemySpawnLeft = createSpawn("enemy_spawn_left", 0, 195, 30, 100);
let enemySpawnRight = createSpawn("enemy_spawn_right", 470, 195, 30, 100);
let enemySpawnUp = createSpawn("enemy_spawn_up", 195, 0, 100, 30);
let enemySpawnDown = createSpawn("enemy_spawn_down", 195, 470, 100, 30);

let soldier = createSprite("soldier", 225, 225, 37, 37);
let newEnemy = createEnemy(enemiesLength, enemyY, enemyX, 30, 30, true)

let laser_left = createSprite("laser_left", 230, 240, 10, 3, false);
let laser_right = createSprite("laser_right", 243, 240, 10, 3, false);
let laser_up = createSprite("laser_up", 240, 230, 3, 10, false);
let laser_down = createSprite("laser_down", 240, 243, 3, 10, false);


loop();