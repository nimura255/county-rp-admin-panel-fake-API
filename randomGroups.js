function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generatePlayer(groupId) {
  const id = getRandomInt(2, 10);
  return {
      id,
      login: `player${id}`,
      password: `playerPass${id}`,
      groupId
  };
}

function generateRandomPlayers(count, groupId) {
  const result = [];
  for (let i = 0; i < count; i++) {
      result.push(generatePlayer(groupId));
  }
  return result;
}

function printPlayer({id, login, password, groupId}, isLast) {
  console.log('\t\t{');
  console.log(`\t\t\t"id": "${id}",`);
  console.log(`\t\t\t"login": "${login}",`);
  console.log(`\t\t\t"password": "${password}",`);
  console.log(`\t\t\t"groupId": "${groupId}"`);
  console.log(`\t\t}${isLast ? '' : ','}`);
}

function printRandomPlayers(count, groupId) {
  console.log('\t[');
  const randomPlayers = generateRandomPlayers(count, groupId);

  randomPlayers.map((player, index) => {
    index === (randomPlayers.length - 1) ? printPlayer(player, true) :  printPlayer(player, false)
  });
  console.log('\t]');
}

printRandomPlayers(10, 'test2');