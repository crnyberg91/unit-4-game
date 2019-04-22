// consider audio and start/reset buttons
// clean up attack button
// get stage backgrounds to work
// add lvl up feature


$(document).ready(function () {
    const charYoda = {
        name: 'yoda',
        health: 80,
        isAlive: true,
        attack: 20,
        stage: '../images/yodaStage.jpg'
    }

    const charLuke = {
        name: 'Luke Skywalker',
        health: 100,
        isAlive: true,
        attack: 15,
        stage: '#fff'
    }

    const charVader = {
        name: 'Darth Vader',
        health: 180,
        isAlive: true,
        attack: 12,
        stage: 'black'
    }

    const charHan = {
        name: 'Han Solo',
        health: 90,
        isAlive: true,
        attack: 18
    }

    let charSelect = true;
    let enemySelect = false;
    let fight = false;
    let charHealth = 0;
    let charAttack = 0;
    let enemyHealth = 0;
    let enemyAttack = 0;
    let winCount = 0;
    let newEnemyHealth = enemyHealth;
    let newCharHealth = charHealth;


    $('#yoda').data(charYoda);
    $('#luke').data(charLuke);
    $('#vader').data(charVader);
    $('#han').data(charHan);



    $('.char').on('click', function () {
        if (charSelect) {
            charSelect = false;
            enemySelect = true;
            charHealth = $(this).data('health');
            charAttack = $(this).data('attack');
            $(this).removeClass('char');
            $(this).addClass('selected-char');
            $('.char').appendTo($('#enemy-select'));
            $('.char').addClass('red');
            $(this).appendTo($('#player'));
            $('#player').data(this);
            $(this).off('click');


            console.log($('.selected-char').data('health'))
            console.log('charselect ' + charSelect);
            console.log($(this).data());
            console.log(charHealth);
            console.log(charAttack);
            console.log($('#player').data(this))

        } else if (enemySelect) {
            enemySelect = false;
            $(this).appendTo($('#enemy'));
            $(this).addClass('selected-enemy');
            // $('.char').off('click');
            enemyHealth = $(this).data('health');
            enemyAttack = $(this).data('attack');
            fight = true;
            // body.css('background-image', "$(this).data('stage')");

            console.log('enemyselect' + enemySelect);
            console.log(enemyHealth);
            console.log(enemyAttack);
            console.log()
        }

        if (fight) {
            newCharHealth = charHealth;
            newEnemyHealth = enemyHealth;
            $('#attackBtn').on('click', function () {
                if (winCount > 2) {
                    alert('YOU WIN')
                } else if (newEnemyHealth < 1) {
                    fight = false;
                    enemySelect = true;
                    winCount++;
                    $('#enemy').empty();
                    $(this).off('click');
                    $('.char').on('click');

                    console.log('win count ' + winCount)
                    console.log(enemySelect);
                    console.log(fight);
                } else if (newCharHealth < 1) {
                    console.log('game over');
                    $(this).off('click');
                    alert('refresh page to play again')
                } else {
                    enemyAttack = (Math.floor(Math.random() * (30 - enemyAttack)) + enemyAttack);
                    charAttack = (Math.floor(Math.random() * (30 - charAttack)) + charAttack);
                    newEnemyHealth -= charAttack;
                    newCharHealth -= enemyAttack;

                    $('#dmgText1').text(`You attack the enemy for ${charAttack} dmg they now have ${newEnemyHealth}.`);
                    $('#dmgText2').text(`they attack you for ${enemyAttack} dmg you now have ${newCharHealth}.`);

                    console.log('button working');
                    console.log(`You attack the enemy for ${charAttack} dmg they now have ${newEnemyHealth}.`);
                    console.log(`they attack you for ${enemyAttack} dmg you now have ${newCharHealth}.`);
                }

            });
        }
    });

});