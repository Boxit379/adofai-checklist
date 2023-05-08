// ADOFAI Checklist
// Classes
class Level {
  constructor(
    id,
    name,
    speedTrialReq,
    attempts,
    accuracy,
    speedTrial,
    completed
  ) {
    this.id = id;
    this.name = name;
    this.attempts = 0;
    this.accuracy = 0;
    this.speedTrial = 0;
    this.speedTrialReq = speedTrialReq;
    this.completed = false;
  }

  checkSpeedTrial() {
    if (this.completed === false) return false;
    return this.speedTrial >= this.speedTrialReq;
  }
}

class World {
  constructor(id, name, levels) {
    this.id = id;
    this.name = name;
    this.levels = levels;
  }

  getLevels() {
    return this.levels;
  }
}

// Define Worlds
const worlds = [
  new World(0, "Main", [
    new Level("1", "A Dance of Fire and Ice", 1.5),
    new Level("2", "Offbeats", 1.5),
    new Level("3", "THE WIND-UP", 1.5),
    new Level("4", "Love Letters", 1.5),
    new Level("5", "The Midnight Train", 1.5),
    new Level("6", "PULSE", 1.1),
    new Level("7", "Spin 2 Win", 1.3),
    new Level("8", "Jungle City", 1.3),
    new Level("9", "Classic Pursuit", 1.3),
    new Level("10", "Butterfly Planet", 1.2),
    new Level("11", "Heracles", 1.2),
    new Level("12", "Artificial Chariot", 1.2),
    new Level("B", "Thanks For Playing My Game", 0),
  ]),
  new World(1, "Bonus", [
    new Level("XF", "Third Wave Flip-Flop"),
    new Level("XC", "Credits"),
    new Level("XH", "Final Hope"),
    new Level("PA", "Distance"),
    new Level("XR", "Rose Garden"),
    new Level("RJ", "Fear Grows"),
    new Level("XN", "Trans-Neptunian Object"),
  ]),
  new World(2, "Crown", [
    new Level("XT", "Options"),
    new Level("XO", "One Forgotten Night"),
    new Level("XI", "It Go"),
  ]),
  new World(3, "Muse Dash", [
    new Level("MN", "Night Wander (cnsouka Remix)"),
    new Level("ML", "La nuit de vif"),
    new Level("MO", "EMOMOMO"),
  ]),
  new World(4, "Neo Cosmos", [
    new Level("T1", "NEW LIFE"),
    new Level("T2", "sing sing red indigo"),
    new Level("T3", "No Hints Here!"),
    new Level("T4", "Third Sun"),
    new Level("T5", "Divine Intervention"),
    new Level("T1EX", "NEW LIFE"),
    new Level("T2EX", "sing sing red indigo"),
    new Level("T3EX", "No Hints Here!"),
    new Level("T4EX", "Third Sun"),
  ]),
];

// Functions
function updateProgress() {
  // For each level
  let totalLevels = 0;
  let completedLevels = 0;
  let totalSpeedTrials = 0;
  let completedSpeedTrials = 0;
  let totalAccurate = 0;
  let completedAccurate = 0;
  worlds.forEach((world) => {
    world.levels.forEach((level) => {
      totalLevels++;
      totalSpeedTrials++;
      totalAccurate++;
      if (level.completed) completedLevels++;
      if (level.checkSpeedTrial()) completedSpeedTrials++;
      if (level.accuracy >= 100) completedAccurate++;
    });
  });
  // Update progress with percent of levels completed and speed trials completed
  let percentLevels = (completedLevels / totalLevels) * 100;
  let percentSpeedTrials = (completedSpeedTrials / totalSpeedTrials) * 100;
  let percentAccurate = (completedAccurate / totalAccurate) * 100;
  let totalPercent = (percentLevels + percentSpeedTrials + percentAccurate) / 3;
  document.getElementById("totalProgress").value = totalPercent;
  document.getElementById("totalProgressText").innerText =
    totalPercent.toFixed(2) + "%";
  // Save everything in local storage
  localStorage.setItem("worlds", JSON.stringify(worlds));
}

// Main
// Load from local storage
if (localStorage.getItem("worlds") !== null) {
  const savedWorlds = JSON.parse(localStorage.getItem("worlds"));
  savedWorlds.forEach((savedWorld) => {
    const world = worlds.find((world) => world.id === savedWorld.id);
    if (world !== undefined) {
      world.levels.forEach((level) => {
        const savedLevel = savedWorld.levels.find(
          (savedLevel) => savedLevel.id === level.id
        );
        if (savedLevel !== undefined) {
          level.completed = savedLevel.completed;
          level.speedTrial = savedLevel.speedTrial;
          level.accuracy = savedLevel.accuracy;
        }
      });
    }
  });
  updateProgress();
}

// Add to DOM

// For each world
worlds.forEach((world) => {
  // Make a new div
  const worldDiv = document.createElement("div");
  worldDiv.classList.add("world");
  // Add the world name
  const worldName = document.createElement("h2");
  worldName.innerText = world.name;
  worldDiv.appendChild(worldName);
  // For each level
  world.levels.forEach((level) => {
    // Make a new div
    const levelDiv = document.createElement("div");
    levelDiv.classList.add("level");
    // Add the level name and id
    const levelName = document.createElement("h3");
    levelName.innerText = level.id + " - " + level.name;
    levelDiv.appendChild(levelName);
    // Add completed div
    const completed = document.createElement("div");
    completed.classList.add("statistic");
    // Add completed text
    const completedText = document.createElement("label");
    completedText.innerText = "Completed";
    // Add completed checkbox
    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = level.completed;
    completedCheckbox.addEventListener("change", () => {
      level.completed = completedCheckbox.checked;
      updateProgress();
    });
    completed.appendChild(completedCheckbox);
    completed.appendChild(completedText);
    levelDiv.appendChild(completed);
    // Add speed trial div
    const speedTrial = document.createElement("div");
    speedTrial.classList.add("statistic");
    // Add speed trial text
    const speedTrialText = document.createElement("label");
    speedTrialText.innerText = "Fastest Speed";
    // Add speed trial input
    const speedTrialInput = document.createElement("input");
    speedTrialInput.type = "number";
    speedTrialInput.value = level.speedTrial;
    speedTrialInput.min = 0;
    speedTrialInput.step = 0.1;
    speedTrialInput.addEventListener("change", () => {
      level.speedTrial = speedTrialInput.value;
      updateProgress();
    });
    speedTrial.appendChild(speedTrialText);
    speedTrial.appendChild(speedTrialInput);
    levelDiv.appendChild(speedTrial);
    // Add best accuracy div
    const bestAccuracy = document.createElement("div");
    bestAccuracy.classList.add("statistic");
    // Add best accuracy text
    const bestAccuracyText = document.createElement("label");
    bestAccuracyText.innerText = "Best Accuracy";
    // Add best accuracy input
    const bestAccuracyInput = document.createElement("input");
    bestAccuracyInput.type = "number";
    bestAccuracyInput.value = level.accuracy;
    bestAccuracyInput.min = 0;
    bestAccuracyInput.step = 0.01;
    bestAccuracyInput.addEventListener("change", () => {
      level.accuracy = bestAccuracyInput.value;
      updateProgress();
    });
    bestAccuracy.appendChild(bestAccuracyText);
    bestAccuracy.appendChild(bestAccuracyInput);
    levelDiv.appendChild(bestAccuracy);
    // Add the level to the world div
    worldDiv.appendChild(levelDiv);
  });
  // Add the world div to the DOM
  document.getElementById("worlds").appendChild(worldDiv);
});
