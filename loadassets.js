function preload() {
  bg = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/alley%20stage.gif?v=1668651530562"
  );
  bgm = createAudio(
    "https://cdn.glitch.global/972c0e28-86ae-4368-9296-f573ccb7ae82/Tekken%203%20Jin%20theme%20arcade%20ver.mp3?v=1667269184277"
  );
  pixelFont = loadFont(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/Retro%20Gaming.ttf?v=1668667876787"
  );
  wasd = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/wasd.png?v=1668661321884"
  );
  arrows = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/arrow%20keys.png?v=1668661319006"
  );
  sword = loadSound(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/sword.mp3?v=1668666101572"
  );
  block = loadSound(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/block.mp3?v=1668666224105"
  );
  hit = loadSound(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/hit.mp3?v=1668666226180"
  );
  p1IdleAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20idle%20sprite%20sheet.png?v=1668547022515",
    { size: [800, 800], frames: 8 }
  );
  p1AttackAni = loadAni(
    "https://cdn.glitch.global/e5ca06d8-cdb6-4524-b0c9-ca1ee4ec9d3e/attack%20sprite%20sheet.png?v=1668540932519",
    { size: [800, 800], frames: 4 }
  );
  p1RunAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20run%20sprite%20sheet.png?v=1668546986144",
    { size: [800, 800], frames: 8 }
  );
  p1DeathAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20death%20sprite%20sheet.png?v=1668548217039",
    { size: [800, 800], frames: 6 }
  );
  p1Block = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20block.png?v=1668650892631"
  );
  p1Blocked = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20blocked.png?v=1668651941540"
  );

  p2IdleAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20idle%20sprite%20sheet.png?v=1668644255411",
    { size: [800, 800], frames: 8 }
  );
  p2AttackAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%201.png?v=1667972603469",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%202.png?v=1667972607799",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%203.png?v=1667972612278",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%204.png?v=1667972617590"
  );
  p2RunAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%201.png?v=1668643356409",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%202.png?v=1668643361357",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%203.png?v=1668643373611",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%204.png?v=1668643380335",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%205.png?v=1668643385471",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%206.png?v=1668643389574",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%207.png?v=1668643395993",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%208.png?v=1668643400508"
  );
  p2DeathAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%201.png?v=1668642722862",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%202.png?v=1668642728663",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%203.png?v=1668642739228",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%204.png?v=1668642744617",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%205.png?v=1668642749988",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%206.png?v=1668642754869",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%207.png?v=1668642759618"
  );
  p2Block = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20block.png?v=1668653396658"
  );
  p2Blocked = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20blocked.png?v=1668653401233"
  );
  unsheathed = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20attack%20frame%202.png?v=1667972572778"
  );
  sheathed = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20attack%20frame%201.png?v=1667972568329"
  );
  teleport = loadSound(
    "https://cdn.glitch.global/21ead304-df2a-4fe5-8191-4c0f0fc5760b/Anime%20Teleportation%20Sound%20Effect%20%20%5BSFX%5D.mp3?v=1671146143762"
  );
}
