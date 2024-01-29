var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];


const countries = ['world','algeria','argentina','argentina/buenos-aires', 'australia','australia/adelaide','australia/brisbane','australia/melbourne','australia/perth','australia/sydney',
'austria','azerbaijan', 'belarus', 'belgium', 'brazil','brazil/brasília','brazil/rio-de-janeiro','brazil/s%C3%A3o-paulo', 'bulgaria','cameroon', 'canada', 'canada/calgary',
'canada/edmonton','canada/london','canada/montr%C3%A9al','canada/ottawa','canada/qu%C3%A9bec','canada/toronto','canada/vancouver','chile','chile/santiago', 'china','china/beijing',
'china/shanghai', 'colombia','colombia/bogot%C3%A1','colombia/medell%C3%ADn', 'costa-rica', 'croatia', 'czechia','ivory-coast', 'denmark', 'denmark/copenhagen', 'egypt',
'finland','finland/helsinki', 'france','france/bordeaux','france/le-havre','france/lyon','france/marseille','france/montpellier','france/nantes','france/nice','france/paris'
,'france/strasbourg','france/toulouse', 'germany','germany/berlin', 'germany/d%C3%BCsseldorf','germany/essen','germany/frankfurt-am-main','germany/hamburg','germany/hannover','germany/k%C3%B6ln',
'germany/mannheim','germany/munich','germany/stuttgart',  'ghana', 'greece','greece/athens', 'hungary', 'india', 'india/bengaluru','india/delhi','india/mumbai', 'indonesia',
'ireland','ireland/dublin', 'israel','israel/tel-aviv', 'italy','italy/florence','italy/milan','italy/naples','italy/palermo','italy/rome','italy/turin','italy/venice', 'japan',
'japan/osaka','japan/tokyo', 'kazakhstan','kenya', 'malaysia', 'mexico','mexico/guadalajara', 'mexico/mexico-city','mexico/monterrey','mexico/puebla', 'mexico/tijuana', 'mexico/toluca',
'mozambique', 'morocco', 'netherlands','netherlands/amsterdam','netherlands/maastricht', 'netherlands/rotterdam', 'netherlands/the-hague', 'netherlands/utrecht', 'new-zealand',
'nigeria','nigeria/benin-city', 'nigeria/kaduna', 'nigeria/kano', 'nigeria/lagos', 'nigeria/port-harcourt', 'norway', 'norway/oslo', 'peru', 'peru/lima', 'philippines','poland',
'poland/kraków', 'poland/warsaw', 'portugal', 'portugal/lisbon','portugal/porto', 'romania', 'romania/bucharest', 'russia', 'russia/moscow', 'russia/saint-petersburg', 'saudi-arabia',
'singapore', 'singapore/singapore', 'senegal', 'south-africa','south-africa/cape-town', 'south-africa/durban', 'south-africa/johannesburg', 'south-korea', 'south-korea/seoul',
'spain', 'spain/barcelona', 'spain/madrid', 'spain/sevilla', 'spain/valencia', 'sweden', 'sweden/göteborg', 'sweden/malmö', 'sweden/stockholm', 'switzerland','tanzania',
'thailand','thailand/bangkok', 'tunisia', 't%C3%BCrkiye', 't%C3%BCrkiye/adana', 't%C3%BCrkiye/ankara','t%C3%BCrkiye/istanbul', 'ukraine','ukraine/kyiv', 'united-arab-emirates',
'united-arab-emirates/dubai', 'united-kingdom', 'united-kingdom/belfast', 'united-kingdom/birmingham', 'united-kingdom/bristol', 'united-kingdom/brighton', 'united-kingdom/cardiff',
'united-kingdom/edinburgh', 'united-kingdom/glasgow', 'united-kingdom/leeds', 'united-kingdom/liverpool', 'united-kingdom/london', 'united-kingdom/manchester', 'united-kingdom/newcastle-upon-tyne',
'united-kingdom/nottingham', 'united-kingdom/portsmouth', 'united-kingdom/sheffield', 'united-states', 'united-states/albany', 'united-states/atlanta', 'united-states/baltimore', 'united-states/boston',
'united-states/buffalo', 'united-states/charlotte', 'united-states/chicago', 'united-states/cincinnati', 'united-states/cleveland','united-states/columbia', 'united-states/columbus',
'united-states/corpus-christi', 'united-states/dallas', 'united-states/denver', 'united-states/detroit', 'united-states/el-paso', 'united-states/fresno', 'united-states/honolulu', 'united-states/houston',
'united-states/indianapolis', 'united-states/irvine', 'united-states/jacksonville', 'united-states/kansas-city', 'united-states/las-vegas', 'united-states/long-island', 'united-states/los-angeles',
'united-states/louisville', 'united-states/memphis', 'united-states/miami', 'united-states/minneapolis', 'united-states/nashville', 'united-states/new-haven',  'united-states/new-orleans', 'united-states/new-york-city',
'united-states/newark', 'united-states/oklahoma-city', 'united-states/orlando', 'united-states/philadelphia', 'united-states/phoenix', 'united-states/pittsburgh', 'united-states/portland-or', 'united-states/raleigh',
'united-states/sacramento', 'united-states/salt-lake-city', 'united-states/san-antonio', 'united-states/san-bernardino', 'united-states/san-diego', 'united-states/san-francisco', 'united-states/seattle',
'united-states/st.-louis', 'united-states/tampa', 'united-states/virginia-beach', 'united-states/washington-d.c.', 'united-states/yonkers',
'uruguay','uzbekistan','uzbekistan/tashkent', 'venezuela','vietnam','zambia'];

setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

console.log(
  "%cYou hacked my password!😠",
  "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%cPassword: '" + password + "' - I wonder what it does?🤔", "color: grey");

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(secret, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("visitor@5vibe.com:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function databaseInput(input) {
  liner.classList.remove("input");
  console.log(`Getting the ${input} database`);

  if (input.includes('/')) {
      window.location.href = 'https://www.shazam.com/services/charts/csv/top-50/' + input;
  } else {
      window.location.href = 'https://www.shazam.com/services/charts/csv/top-200/' + input;
  }
}

function player(input) {
  console.log(`Playing ${input} playlist`);

  // Send the playlist name to the server
  window.location.href = '/playlist_name?name=' + encodeURIComponent(input);
}

function commander(cmd) {
  const words = cmd.toLowerCase().split(' ');
  if (words[0] === 'download' && countries.includes(words[1])) {
    databaseInput(words[1]);
    return;  
  }
  else if (words[0] === 'play' && countries.includes(words[1])) {
    player(words[1]);
    return;  
  }
  else{
    liner.classList.remove("input");
  }

  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(whoami, "color2 margin", 80);
      break;
    case "shazam2":
        addLine("Type database to access database:  <br>", "color2", 80);
        break;
    case "database":
      addLine("Opening database...", "color2", 80);
      (async () => {
          for (const country of countries) {
              await addLine(country, "color2", 80);
          }
          addLine("<br><br>terminal format: download australia or download australia-sydney", "color2", 80);
      liner.classList.add("input");
      })();

      break;

    case "playlist":
      addLine("Opening playlist...", "color2", 80);
      (async () => {
        for (const country of countries) {
            await addLine(country, "color2", 80);
        }
        addLine("<br><br>terminal format: play australia or play australia-sydney", "color2", 80);
    liner.classList.add("input");
    })();
      break;

        
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", 80);
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000); 
      break;

    case "secret":
      liner.classList.add("password");
      pw = true;
      break;

    case "connect":
      loopLines(social, "color2 margin", 80);
      break;
    case "password":
      addLine("<span class=\"inherit\"> Lol! You're joking, right? You\'re gonna have to try harder than that!😂</span>", "error", 100);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine('Opening mailto:<a href="mailto:srijanchaudhary2003@gmail.com">srijanchaudhary2003@gmail.com</a>...', "color2", 80);
      newTab(email);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    case "resume":
      loopLines(resume, "", 80);
      break;
    case "linkedin":
      addLine("Opening LinkedIn...", "color2", 0);
      newTab(linkedin);
      break;
    case "instagram":
      addLine("Opening Instagram...", "color2", 0);
      newTab(instagram);
      break;
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}