$(document).ready(function () {
    const charYoda = {
        name: 'yoda',
        health: 80,
        isAlive: true,
        attack: 20,
        stage: url = 'assets/images/yodaStage.jpg'
    }

    const charLuke = {
        name: 'Luke Skywalker',
        health: 100,
        isAlive: true,
        attack: 15
    }

    const charVader = {
        name: 'Darth Vader',
        health: 180,
        isAlive: true,
        attack: 12
    }

    const charHan = {
        name: 'Han Solo',
        health: 90,
        isAlive: true,
        attack: 18
    }

    let charSelect = true;
    let enemySelect = false;
    let charHealth = 0;
    let charAttack = 0;
    let enemyHealth = 0;
    let enemyAttack = 0;


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
            $(this).removeClass('#char');
            $('.char').appendTo($('#enemy-select'));
            // $('.char').addClass('.red') FIX
            $(this).appendTo($('#player'));
            $(this).off('click');


            console.log('charselect' + charSelect);
            console.log($(this).data());
            console.log(charHealth);
            console.log(charAttack);

        } else if (enemySelect) {
            enemySelect = false;
            $(this).appendTo($('#enemy'));
            $('.char').off('click');
            enemyHealth = $(this).data('health');
            enemyAttack = $(this).data('attack');
            // $('body').css('background-image', $(this).data('stage')); FIX

            console.log('enemyselect' + enemySelect);
            console.log(enemyHealth);
            console.log(enemyAttack);

        }

        if (charSelect === false && enemySelect === false) {
            $('#attack').on('click', function () {
                if (enemyHealth < 1) {
                    enemySelect = true;

                } else if (charHealth < 1) {
                    console.log('game over')
                } else if (enemyHealth > 0 && charHealth > 0) {
                    enemyHealth =  enemyHealth - charAttack;
                    // enemyAttack = enemyAttack + (Math.Random() * 2); FIX
                    charHealth = charHealth - enemyAttack;
                    // charAttack = charAttack + (Math.Random() * 2); FIX
                    $('#dmgText1').text(`You attack the enemy for ${charAttack} dmg they now have ${enemyHealth - charAttack}.`);
                    $('#dmgText2').text(`they attack you for ${enemyAttack} dmg you now have ${charHealth - enemyAttack}.`);
                }

                console.log('button working');
                console.log(`You attack the enemy for ${charAttack} dmg they now have ${enemyHealth - charAttack}.`);
                console.log(`they attack you for ${enemyAttack} dmg you now have ${charHealth - enemyAttack}.`);
            });
        }
    });

});