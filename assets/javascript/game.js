

// consider audio and start/reset buttons
// clean up attack button



$(document).ready(function () {

    const charYoda = {
        name: 'yoda',
        health: 80,
        isAlive: true,
        attack: 10,
        counterAttack: 10,
        stage: 'url(assets/images/yodaStage.jpg)'
    }

    const charLuke = {
        name: 'Luke Skywalker',
        health: 100,
        isAlive: true,
        attack: 6,
        counterAttack: 8,
        stage: 'url(assets/images/lukeStage.jpg)'
    }

    const charVader = {
        name: 'Darth Vader',
        health: 180,
        isAlive: true,
        attack: 5,
        counterAttack: 15,
        stage: 'url(assets/images/vaderStage.jpg)'
    }

    const charHan = {
        name: 'Han Solo',
        health: 90,
        isAlive: true,
        attack: 8,
        counterAttack: 12,
        stage: 'url(assets/images/hanStage.jpg)'
    }

    let charSelect = true;
    let enemySelect = false;
    let fight = false;
    let charHealth = 0;
    let charAttack = 0;
    let enemyHealth = 0;
    let enemyAttack = 0;
    let winCount = 0;
    let levelUp = 1;
    let newEnemyHealth = enemyHealth;
    let newCharHealth = charHealth;
    let charHealthDisplay;
    let enemyHealthDisplay;
    let enemyName;
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
            charHealthDisplay = $(this).find('.health-bar');
            $('.char').appendTo($('#enemy-select'));
            $('.char').addClass('red');
            $(this).appendTo($('#player'));
            $('#player').data(this);
            $(this).off('click');


            console.log($('.selected-char').data('health'));
            console.log('charselect ' + charSelect);
            console.log($(this).data());
            console.log(charHealth);
            console.log(charAttack);
            console.log($('#player').data(this));

        } else if (enemySelect) {
            enemySelect = false;
            $(this).appendTo($('#enemy'));
            $(this).addClass('selected-enemy');
            // $('.char').off('click');
            enemyName = $(this).data('name');
            enemyHealth = $(this).data('health');
            enemyAttack = $(this).data('attack');
            enemyHealthDisplay = $(this).find('.health-bar');
            fight = true;
            $('body').css('background', $(this).data('stage'));
            $('h1').css('color', '#fff')

            console.log('enemyselect' + enemySelect);
            console.log(enemyHealth);
            console.log(enemyAttack);
            console.log(fight);
        }


        if (fight) {
            newCharHealth = charHealth;
            newEnemyHealth = enemyHealth;

            console.log('new charhealth ' + newCharHealth);
            console.log('newenemyhealth ' + newEnemyHealth);

            $('#attackBtn').on('click', function () {

                
                    newEnemyHealth -= charAttack * levelUp;
                    newCharHealth -= enemyAttack;

                    $(charHealthDisplay).text(newCharHealth);
                    $(enemyHealthDisplay).text(newEnemyHealth);
                    $('#dmgText1').text(`you attack ${enemyName} for ${charAttack * levelUp} dmg. They now have ${newEnemyHealth}.`);
                    $('#dmgText2').text(`${enemyName} counter-attacks you for ${enemyAttack} dmg. You now have ${newCharHealth}.`);
                    levelUp++;
                    console.log('button working');
                    console.log(`You attack the enemy for ${charAttack * levelUp} dmg. they now have ${newEnemyHealth}.`);
                    console.log(`they counter-attack you back for ${enemyAttack} dmg. you now have ${newCharHealth}.`);

                    if (newEnemyHealth < 1) {
                        fight = false;
                        enemySelect = true;
                        winCount++;
                        $('#dmgText1').text(`You attack ${enemyName} for ${charAttack * levelUp} dmg. A killing blow.`);
                        $('#dmgText2').text('');
                        $('#enemy').empty();
                        $('#attackBtn').off('click');
                        $('.char').on('click');

                        if (winCount === 3) {
                            $('#dmgText1').text(`You attack ${enemyName} for ${charAttack * levelUp} dmg. A killing blow.`);
                            $('#dmgText2').text('YOU WIN!!');
                            $('#attackBtn').off('click');

                        }

                        console.log('win count ' + winCount);
                        console.log(enemySelect);
                        console.log(fight);
                        console.log('level up: ' + levelUp);

                    } else if (newCharHealth < 1) {
                        console.log('game over');
                        $('#attackBtn').off('click');
                        $('#dmgText1').text('GAME OVER refresh page to play again');
                        $('#dmgText2').text('');

                    }
            });

            // else {

            // }
        }
    });
});