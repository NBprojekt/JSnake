/* 
      This file is part of JSnake.
  
     JSnake is free software: you can redistribute it and/or modify
     it under the terms of the GNU General Public License as published by
     the Free Software Foundation, either version 3 of the License.
  
     JSnake is distributed in the hope that it will be useful,
     but WITHOUT ANY WARRANTY; without even the implied warranty of
     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     GNU General Public License for more details.
      
     You should have received a copy of the GNU General Public License
     along with JSnake.  
     If not, see <http://www.gnu.org/licenses/>. 
*/ 

    // Vardeklaration
    var game, context;
    var xSpeed, ySpeed;
    var xPlayer, yPlayer;
    var xMap, yMap;
    var xFood, yFood;
    var path = [], tail;
    var points, foodColors, bodyColors;
    var currentIndex, temporaryValue, randomIndex;
    
    
    window.onload = function start() {
        game = document.getElementById( "game" );
        context = game.getContext( "2d" );

        document.addEventListener( "keydown", keyPushed );
        setInterval( gameloop, 100);

        xSpeed = ySpeed = 0;
        xPlayer = yPlayer = 10;
        xMap = yMap = 20;
        xFood = yFood = 15;
        tail = 5;
        points = 0;
        foodColors = ['red', 'orange', 'lime', 'yellow', 'aqua', 'darksalmon'];
	bodyColors = ['grey', 'ghostwhite'];
        readCookie();
    }

    function gameloop() {
        xPlayer += xSpeed;
        yPlayer += ySpeed;
        if ( xPlayer < 0 )
            xPlayer = xMap -1;
        if ( xPlayer > xMap -1)
            xPlayer = 0;
        if ( yPlayer < 0 )
            yPlayer = yMap -1;
        if ( yPlayer > yMap -1)
            yPlayer = 0;

        // Background 
        context.fillStyle = "black";
        context.fillRect( 0, 0, game.width, game.height );

        // Draw player
        var j = 0;
        for ( var i = 0 ; i < path.length ; i++ ) {
            // snake head
            if ( i == path.length - 1  )    
                context.fillStyle = "purple"; 
            // snake body
            else {  
                if ( j == bodyColors.length )
                    j = 0;
                context.fillStyle =  bodyColors[j];
                j++;
            }
            context.fillRect( path[i].x * xMap, path[i].y * yMap, xMap - 2, yMap - 2 );
            // eat itself
            if ( path[i].x == xPlayer && path[i].y == yPlayer && tail > 5 ) { 
                createCookie();
                window.location.href = "index.html"; 
            }
        }
        path.push( { x : xPlayer, y : yPlayer } );
        while ( path.length > tail ) {
            path.shift();
        }

        // eat food
        if ( xFood == xPlayer && yFood == yPlayer ) {
            tail++;
            points++; 
            shuffle(foodColors);
            document.getElementById('points').innerHTML = points;
            xFood = Math.floor( Math.random() * xMap );
            yFood = Math.floor( Math.random() * yMap );
        }

        // Draw food
        context.fillStyle = foodColors[0];
        context.fillRect( xFood * xMap, yFood * yMap, xMap - 2, yMap - 2 );
    }
    
    function keyPushed(key) {
        switch ( key.keyCode ) {
            case 37:    // arrowkey left
                xSpeed = -1;
                ySpeed = 0;
                break;
            case 38:    // arrowkey top
                xSpeed = 0;
                ySpeed = -1;
                break;
            case 39:    // arrowkey rights
                xSpeed = 1;
                ySpeed = 0;
                break;
            case 40:    // arrowkey bottom
                xSpeed = 0;
                ySpeed = 1;
                break;
        }
    } 
    
    function shuffle(array) {
         
        currentIndex = array.length;
        while ( 0 !== currentIndex ) { 
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }
    
    function createCookie() {
        var expires = "";
        var days = 7;  
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString(); 
        
        document.cookie = "coockieHighScore=" + 
                document.getElementById('points').innerHTML + expires + "; path=/";
    }

    function readCookie() {
        var nameEQ = "coockieHighScore=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while ( c.charAt(0)==' ' ) {
                c = c.substring( 1, c.length );
            }
            if ( c.indexOf(nameEQ) == 0 ) {
                text = c.substring( nameEQ.length,c.length );
            }
        }
        document.getElementById('highScore').innerHTML = text;
        return null;
    }
