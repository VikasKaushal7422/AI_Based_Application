/* ==========================================================================
   AI Powered LMS — script.js
   Everything runs in the browser. No backend, no API, no real AI model.
   Sections: 1 data · 2 helpers · 3 course rendering · 4 filters/sort
             5 AI search · 6 doubt assistant · 7 my learning · 8 recommendations
             9 stats · 10 modal · 11 navigation & misc
   ========================================================================== */

/* ---------------------------------------------------------------- 1. DATA */

/* Course catalogue. `progress` is the learner's demo progress (0–100). */
const COURSES = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    emoji: '🧮',
    category: 'DSA',
    level: 'Intermediate',
    duration: 48,          // hours
    lessons: 86,
    progress: 65,
    learners: 18400,
    desc: 'Arrays to graphs, with the patterns interviewers actually ask about.',
    keywords: ['dsa', 'data structures', 'algorithms', 'array', 'tree', 'graph', 'linked list', 'recursion', 'sorting', 'binary search', 'stack', 'queue'],
    syllabus: ['Complexity analysis', 'Arrays, strings, hashing', 'Linked lists, stacks, queues', 'Trees and binary search trees', 'Graphs: BFS, DFS, shortest paths', 'Dynamic programming']
  },
  {
    id: 'cpp',
    title: 'C++ Programming',
    emoji: '⚙️',
    category: 'Programming',
    level: 'Beginner',
    duration: 26,
    lessons: 52,
    progress: 30,
    learners: 12100,
    desc: 'From syntax and pointers to STL containers used in contests.',
    keywords: ['c++', 'cpp', 'pointers', 'stl', 'oops', 'programming', 'competitive'],
    syllabus: ['Syntax and control flow', 'Functions and recursion', 'Pointers and memory', 'Classes and OOP', 'Templates', 'The STL in practice']
  },
  {
    id: 'java',
    title: 'Java Programming',
    emoji: '☕',
    category: 'Programming',
    level: 'Beginner',
    duration: 30,
    lessons: 61,
    progress: 40,
    learners: 15200,
    desc: 'Object-oriented Java with collections, exceptions and file handling.',
    keywords: ['java', 'oops', 'jvm', 'collections', 'programming', 'inheritance'],
    syllabus: ['Java basics and the JVM', 'Classes, objects, inheritance', 'Interfaces and abstraction', 'Collections framework', 'Exceptions and files', 'Multithreading basics']
  },
  {
    id: 'web',
    title: 'Web Development',
    emoji: '🌐',
    category: 'Web Development',
    level: 'Beginner',
    duration: 38,
    lessons: 74,
    progress: 15,
    learners: 21700,
    desc: 'Build and ship responsive sites with HTML, CSS and JavaScript.',
    keywords: ['web', 'html', 'css', 'javascript', 'frontend', 'responsive', 'react', 'website'],
    syllabus: ['Semantic HTML', 'CSS layout: flexbox and grid', 'Responsive design', 'JavaScript and the DOM', 'Fetch and JSON', 'Deploying a project']
  },
  {
    id: 'dbms',
    title: 'Database Management System',
    emoji: '🗄️',
    category: 'Core CS',
    level: 'Intermediate',
    duration: 24,
    lessons: 48,
    progress: 80,
    learners: 13800,
    desc: 'ER modelling, normalisation, SQL and transaction handling.',
    keywords: ['dbms', 'database', 'sql', 'normalization', 'er model', 'transaction', 'acid', 'joins'],
    syllabus: ['ER modelling', 'Relational algebra', 'SQL queries and joins', 'Normalisation to BCNF', 'Transactions and ACID', 'Indexing basics']
  },
  {
    id: 'os',
    title: 'Operating Systems',
    emoji: '🖥️',
    category: 'Core CS',
    level: 'Intermediate',
    duration: 22,
    lessons: 44,
    progress: 25,
    learners: 11500,
    desc: 'Processes, scheduling, memory and the classic deadlock problems.',
    keywords: ['os', 'operating system', 'process', 'thread', 'scheduling', 'deadlock', 'memory', 'paging'],
    syllabus: ['Processes and threads', 'CPU scheduling', 'Synchronisation', 'Deadlocks', 'Memory management and paging', 'File systems']
  },
  {
    id: 'cn',
    title: 'Computer Networks',
    emoji: '📡',
    category: 'Core CS',
    level: 'Intermediate',
    duration: 20,
    lessons: 40,
    progress: 0,
    learners: 9800,
    desc: 'The OSI and TCP/IP stacks explained layer by layer.',
    keywords: ['networks', 'cn', 'tcp', 'ip', 'osi', 'http', 'routing', 'dns'],
    syllabus: ['OSI and TCP/IP models', 'Data link layer', 'IP addressing and subnetting', 'Routing algorithms', 'TCP vs UDP', 'Application layer protocols']
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    emoji: '📈',
    category: 'AI/ML',
    level: 'Advanced',
    duration: 42,
    lessons: 78,
    progress: 10,
    learners: 19600,
    desc: 'Regression to neural networks, with hands-on Python notebooks.',
    keywords: ['machine learning', 'ml', 'regression', 'classification', 'neural network', 'python', 'model', 'training', 'supervised'],
    syllabus: ['Supervised vs unsupervised', 'Linear and logistic regression', 'Decision trees and ensembles', 'Model evaluation', 'Neural network basics', 'A full ML project']
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    emoji: '🤖',
    category: 'AI/ML',
    level: 'Advanced',
    duration: 34,
    lessons: 62,
    progress: 0,
    learners: 16300,
    desc: 'Search, knowledge representation, reasoning and modern AI systems.',
    keywords: ['ai', 'artificial intelligence', 'search', 'heuristic', 'agent', 'reasoning', 'nlp'],
    syllabus: ['Intelligent agents', 'Uninformed and heuristic search', 'Game playing and minimax', 'Knowledge representation', 'Probabilistic reasoning', 'Intro to modern AI systems']
  },
  {
    id: 'sysdesign',
    title: 'System Design',
    emoji: '🏗️',
    category: 'Core CS',
    level: 'Advanced',
    duration: 28,
    lessons: 45,
    progress: 0,
    learners: 14200,
    desc: 'Scaling, caching, queues and the trade-offs behind real systems.',
    keywords: ['system design', 'scalability', 'cache', 'load balancer', 'microservices', 'architecture', 'sharding'],
    syllabus: ['Scalability fundamentals', 'Load balancing', 'Caching strategies', 'Databases and sharding', 'Message queues', 'Case studies']
  },
  {
    id: 'competitive',
    title: 'Competitive Programming',
    emoji: '🏁',
    category: 'DSA',
    level: 'Advanced',
    duration: 32,
    lessons: 58,
    progress: 0,
    learners: 8700,
    desc: 'Contest patterns, greedy tricks and fast implementation practice.',
    keywords: ['competitive', 'contest', 'codeforces', 'greedy', 'dp', 'number theory', 'algorithms'],
    syllabus: ['Contest setup and IO', 'Greedy patterns', 'Binary search on answer', 'Dynamic programming drills', 'Number theory', 'Graph problems']
  },
  {
    id: 'python',
    title: 'Python for Problem Solving',
    emoji: '🐍',
    category: 'Programming',
    level: 'Beginner',
    duration: 18,
    lessons: 36,
    progress: 100,
    learners: 22500,
    desc: 'Python fundamentals aimed at solving problems, not memorising syntax.',
    keywords: ['python', 'scripting', 'programming', 'basics', 'pandas', 'numpy'],
    syllabus: ['Types and control flow', 'Functions and modules', 'Lists, dicts, sets', 'File handling', 'Libraries: numpy, pandas', 'Mini projects']
  }
];

/* Scripted answers for the doubt assistant. Keys are matched loosely. */
const ANSWERS = [
  {
    match: ['recursion', 'recursive'],
    title: 'Recursion',
    body: 'A function that calls itself on a smaller version of the same problem. Every recursive function needs a base case that stops the calls, and a recursive case that moves towards it.',
    points: ['Base case: the smallest input you can answer directly', 'Recursive case: solve a smaller input, then combine', 'Each call sits on the call stack until it returns', 'factorial(n) = n × factorial(n-1), with factorial(0) = 1'],
    course: 'dsa'
  },
  {
    match: ['dbms', 'database management'],
    title: 'DBMS',
    body: 'A database management system is software that stores data and controls how it is read and written. It handles queries, concurrent users, integrity rules and recovery so applications do not have to.',
    points: ['Relational DBMS store data in tables with keys', 'SQL is the query language for relational systems', 'ACID properties keep transactions safe', 'Examples: MySQL, PostgreSQL, Oracle'],
    course: 'dbms'
  },
  {
    match: ['binary search'],
    title: 'Binary search',
    body: 'A way to find a value in a sorted array by halving the search range each step. Compare the middle element: if it is smaller than the target, search the right half, otherwise search the left half.',
    points: ['Input must be sorted', 'Time complexity O(log n), space O(1) when iterative', 'Use low + (high - low) / 2 to avoid overflow', 'Works on any monotonic answer space, not only arrays'],
    course: 'dsa'
  },
  {
    match: ['machine learning', 'what is ml'],
    title: 'Machine learning',
    body: 'Machine learning builds programs that learn patterns from data instead of following rules written by hand. You give a model examples, it adjusts its parameters to reduce error, and then it predicts on new data.',
    points: ['Supervised: labelled data, e.g. spam or not spam', 'Unsupervised: find structure, e.g. clustering', 'Reinforcement: learn from rewards', 'Always check accuracy on data the model has not seen'],
    course: 'ml'
  },
  {
    match: ['linked list'],
    title: 'Linked list',
    body: 'A sequence of nodes where each node stores a value and a pointer to the next node. Nodes are scattered in memory, so insertion and deletion are cheap but random access is not.',
    points: ['Insert or delete at a known position: O(1)', 'Access the k-th element: O(n)', 'Singly, doubly and circular are the common variants', 'Reversing a list is a classic interview question'],
    course: 'dsa'
  },
  {
    match: ['time complexity', 'big o', 'complexity'],
    title: 'Time complexity',
    body: 'Big-O describes how the running time grows as the input grows. It ignores constants and focuses on the dominant term.',
    points: ['O(1) constant, O(log n) halving, O(n) one pass', 'O(n log n) typical for good sorting', 'O(n²) nested loops over the same input', 'Measure the worst case unless stated otherwise'],
    course: 'dsa'
  },
  {
    match: ['normalization', 'normalisation', 'normal form'],
    title: 'Normalisation',
    body: 'Normalisation organises tables so that each fact is stored once. It removes update, insert and delete anomalies by splitting wide tables and linking them with keys.',
    points: ['1NF: atomic values, no repeating groups', '2NF: no partial dependency on part of a composite key', '3NF: no transitive dependency on non-key attributes', 'BCNF: every determinant is a candidate key'],
    course: 'dbms'
  },
  {
    match: ['deadlock'],
    title: 'Deadlock',
    body: 'A deadlock happens when processes each hold a resource and wait for one another forever. All four Coffman conditions must hold at once for it to occur.',
    points: ['Mutual exclusion', 'Hold and wait', 'No preemption', 'Circular wait — break any one and the deadlock cannot form'],
    course: 'os'
  },
  {
    match: ['oops', 'oop', 'object oriented'],
    title: 'Object-oriented programming',
    body: 'OOP models a program as objects that hold data and the behaviour acting on that data.',
    points: ['Encapsulation: keep state private, expose methods', 'Abstraction: show what an object does, hide how', 'Inheritance: reuse and extend a base type', 'Polymorphism: one interface, many implementations'],
    course: 'java'
  },
  {
    match: ['tcp', 'udp'],
    title: 'TCP vs UDP',
    body: 'Both are transport layer protocols. TCP sets up a connection and guarantees ordered delivery; UDP just sends datagrams and leaves reliability to the application.',
    points: ['TCP: handshake, acknowledgements, retransmission, flow control', 'UDP: no handshake, lower latency, no ordering', 'TCP suits web pages and file transfer', 'UDP suits live video, games and DNS'],
    course: 'cn'
  }
];

/* Demo state for the dashboard. */
const state = {
  search: '',
  category: 'all',
  level: 'all',
  sort: 'popular',
  recent: [],
  hoursLearned: 126,
  streak: 12,
  certificates: 3
};

/* ------------------------------------------------------------- 2. HELPERS */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const byId = id => COURSES.find(c => c.id === id);

/** Escape text before it goes into innerHTML. */
function esc(str){
  return String(str).replace(/[&<>"']/g, ch => (
    { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]
  ));
}

/** Small transient message at the bottom of the screen. */
let toastTimer;
function toast(message){
  const el = $('#toast');
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
}

/** Scroll to a section and keep the sidebar/navbar highlight in sync. */
function goTo(id){
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeSidebar();
}

/** Set the width of a progress bar through the --p custom property. */
function setBar(barEl, percent){
  const fill = barEl.querySelector('i');
  if (fill) fill.style.setProperty('--p', percent + '%');
}

/* --------------------------------------------------- 3. COURSE RENDERING */

/** Build the markup for one course card. */
function courseCard(course, note){
  const el = document.createElement('article');
  el.className = 'course';
  el.dataset.id = course.id;

  const progressBlock = course.progress > 0 ? `
    <div class="bar"><i></i></div>
    <div class="bar-note">
      <span>${course.progress === 100 ? 'Completed' : 'In progress'}</span>
      <span>${course.progress}%</span>
    </div>` : '';

  el.innerHTML = `
    <div class="course-art" data-cat="${esc(course.category)}">
      <span class="course-emoji" aria-hidden="true">${course.emoji}</span>
      <span class="course-cat">${esc(course.category)}</span>
    </div>
    <div class="course-body">
      <h3>${esc(course.title)}</h3>
      <p class="course-desc">${esc(note || course.desc)}</p>
      <div class="meta">
        <span class="tag tag-level" data-level="${esc(course.level)}">${esc(course.level)}</span>
        <span class="tag">${course.duration} hrs</span>
        <span class="tag">${course.lessons} lessons</span>
      </div>
      ${progressBlock}
      <button class="btn btn-solid" type="button" data-view="${course.id}">
        ${course.progress > 0 && course.progress < 100 ? 'Resume course' : 'View course'}
      </button>
    </div>`;

  const bar = el.querySelector('.bar');
  if (bar) setBar(bar, course.progress);
  return el;
}

/** Render a list of courses into a container, with an empty state fallback. */
function renderCourses(container, list, emptyMessage, notes){
  container.innerHTML = '';
  if (!list.length){
    container.innerHTML = `
      <div class="empty">
        <h3>No courses found</h3>
        <p>${esc(emptyMessage)}</p>
        <button class="btn btn-quiet" type="button" data-reset>Clear filters</button>
      </div>`;
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(course => frag.appendChild(courseCard(course, notes && notes[course.id])));
  container.appendChild(frag);
}

/* ---------------------------------------------- 4. FILTERING AND SORTING */

/** True when a course matches a free-text query (title, description, keywords). */
function matchesQuery(course, query){
  if (!query) return true;
  const haystack = [course.title, course.desc, course.category, course.level, ...course.keywords]
    .join(' ')
    .toLowerCase();
  // Every meaningful word of the query must appear somewhere in the course.
  const words = query.toLowerCase().split(/[^a-z0-9+#]+/).filter(w => w.length > 2 && !STOPWORDS.includes(w));
  if (!words.length) return haystack.includes(query.toLowerCase());
  return words.some(word => haystack.includes(word));
}

const STOPWORDS = ['the','what','whats','how','for','and','best','course','courses','learn','learning','explain','about','with','from','give','show','tell','need','want','which','this','that','are','can','should','study'];

function applyFilters(){
  let list = COURSES.filter(c =>
    matchesQuery(c, state.search) &&
    (state.category === 'all' || c.category === state.category) &&
    (state.level === 'all' || c.level === state.level)
  );

  const sorters = {
    popular:  (a, b) => b.learners - a.learners,
    az:       (a, b) => a.title.localeCompare(b.title),
    za:       (a, b) => b.title.localeCompare(a.title),
    short:    (a, b) => a.duration - b.duration,
    progress: (a, b) => b.progress - a.progress
  };
  list = list.slice().sort(sorters[state.sort] || sorters.popular);

  renderCourses($('#courseGrid'), list, 'Nothing matched those filters. Try a broader search or reset them.');
  $('#resultCount').textContent = list.length
    ? `${list.length} of ${COURSES.length} courses`
    : 'No matches yet';
}

function resetFilters(){
  state.search = ''; state.category = 'all'; state.level = 'all'; state.sort = 'popular';
  $('#courseSearch').value = '';
  $('#categoryFilter').value = 'all';
  $('#levelFilter').value = 'all';
  $('#sortBy').value = 'popular';
  applyFilters();
}

/* ------------------------------------------------------- 5. AI SEARCH */

/** Demo "AI" search: ranks courses by how well they match the phrase. */
function aiSearch(query){
  const note = $('#aiSearchNote');
  const results = $('#aiResults');

  if (!query.trim()){
    results.innerHTML = '';
    note.textContent = 'Demo search — results come from the course list in this page, not from a live model.';
    return;
  }

  const words = query.toLowerCase().split(/[^a-z0-9+#]+/)
    .filter(w => w.length > 2 && !STOPWORDS.includes(w));

  const scored = COURSES.map(course => {
    const title = course.title.toLowerCase();
    const keys = course.keywords.join(' ');
    let score = 0;
    words.forEach(word => {
      if (title.includes(word)) score += 4;
      if (keys.includes(word)) score += 3;
      if (course.desc.toLowerCase().includes(word)) score += 1;
      if (course.category.toLowerCase().includes(word)) score += 2;
    });
    return { course, score };
  }).filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  if (!scored.length){
    results.innerHTML = `
      <div class="empty">
        <h3>No courses found</h3>
        <p>Nothing in the catalogue matches “${esc(query)}”. Try a topic like graphs, SQL, networks or neural networks.</p>
        <button class="btn btn-quiet" type="button" data-scroll-to="courses">Browse all courses</button>
      </div>`;
    note.textContent = `Searched ${COURSES.length} courses · 0 matches`;
    return;
  }

  note.textContent = `Searched ${COURSES.length} courses · ${scored.length} match${scored.length > 1 ? 'es' : ''} for “${query}”`;
  renderCourses(results, scored.map(s => s.course), '');
}

/* ------------------------------------------------ 6. AI DOUBT ASSISTANT */

/** Append a message bubble to the chat log. */
function addMessage(who, html){
  const log = $('#chatLog');
  const el = document.createElement('div');
  el.className = 'msg ' + (who === 'user' ? 'msg-user' : 'msg-ai');
  el.innerHTML = (who === 'user' ? '<b>You</b>' : '<b>AI assistant</b>') + html;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
  return el;
}

/** Pick a scripted answer, or fall back to matching courses. */
function answerFor(question){
  const q = question.toLowerCase();
  const hit = ANSWERS.find(a => a.match.some(m => q.includes(m)));

  if (hit){
    const course = byId(hit.course);
    return `
      <p><strong>${esc(hit.title)}</strong> — ${esc(hit.body)}</p>
      <ul>${hit.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      ${course ? `<p class="msg-link">Covered in <button class="chip" type="button" data-view="${course.id}">${esc(course.title)}</button></p>` : ''}`;
  }

  const related = COURSES.filter(c => matchesQuery(c, question)).slice(0, 3);
  if (related.length){
    return `
      <p>This demo has scripted answers for a fixed set of topics, and your question is not one of them yet. These courses cover it:</p>
      <ul>${related.map(c => `<li>${esc(c.title)} — ${esc(c.desc)}</li>`).join('')}</ul>`;
  }
  return `<p>No scripted answer for that one. Try recursion, binary search, linked lists, DBMS, normalisation, deadlocks, OOP, TCP vs UDP or machine learning.</p>`;
}

/** Show typing dots, then replace them with the answer. */
function askAssistant(question){
  addMessage('user', `<p>${esc(question)}</p>`);
  const pending = addMessage('ai', '<div class="typing"><i></i><i></i><i></i></div>');

  setTimeout(() => {
    pending.innerHTML = '<b>AI assistant</b>' + answerFor(question);
    $('#chatLog').scrollTop = $('#chatLog').scrollHeight;
  }, 620);
}

function greetAssistant(){
  $('#chatLog').innerHTML = '';
  addMessage('ai', '<p>Ask a concept you are stuck on and I will break it down. Answers here are scripted demo replies, so stick to core CS topics.</p>');
}

/* --------------------------------------------------- 7. MY LEARNING */

function renderLearning(){
  const inProgress = COURSES.filter(c => c.progress > 0 && c.progress < 100)
    .sort((a, b) => b.progress - a.progress);
  const completed = COURSES.filter(c => c.progress === 100);

  // Continue learning — the course closest to completion.
  const next = inProgress[0];
  const card = $('#continueCard');
  if (next){
    card.innerHTML = `
      <p class="eyebrow">Continue learning</p>
      <h3>${esc(next.title)}</h3>
      <p class="continue-lesson">Next up: ${esc(next.syllabus[Math.min(next.syllabus.length - 1, Math.floor(next.progress / 20))])}</p>
      <div class="bar"><i></i></div>
      <div class="bar-note"><span>${next.lessons} lessons</span><span>${next.progress}% done</span></div>
      <button class="btn btn-solid" type="button" data-view="${next.id}">Resume course</button>`;
    setBar(card.querySelector('.bar'), next.progress);
  } else {
    card.innerHTML = `
      <p class="eyebrow">Continue learning</p>
      <h3>Nothing in progress</h3>
      <p class="continue-lesson">Open a course to start tracking progress.</p>
      <button class="btn btn-solid" type="button" data-scroll-to="courses">Explore courses</button>`;
  }

  // In-progress list with bars.
  const list = $('#progressList');
  list.innerHTML = '';
  inProgress.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="progress-row"><span>${esc(c.title)}</span><b>${c.progress}%</b></div>
      <div class="bar"><i></i></div>`;
    setBar(li.querySelector('.bar'), c.progress);
    list.appendChild(li);
  });
  if (!inProgress.length) list.innerHTML = '<li class="empty-line">No active courses yet.</li>';

  // Completed list.
  const done = $('#completedList');
  done.innerHTML = completed.length
    ? completed.map(c => `<li><button type="button" data-view="${c.id}">${esc(c.title)}</button><span class="done-mark">Done</span></li>`).join('')
    : '<li class="empty-line">Finish a course to see it here.</li>';
}

/** Keep a short list of recently opened courses. */
function trackRecent(id){
  state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 4);
  const list = $('#recentList');
  list.innerHTML = state.recent.map((cid, i) => {
    const c = byId(cid);
    return `<li><button type="button" data-view="${c.id}">${esc(c.title)}</button><span class="when">${i === 0 ? 'just now' : i + ' opens ago'}</span></li>`;
  }).join('');
}

/* ------------------------------------------- 8. AI RECOMMENDATIONS */

/**
 * Demo recommendation logic: take the course with the highest progress,
 * then suggest unstarted courses in a related area.
 */
const RELATED = {
  dsa:        ['competitive', 'sysdesign', 'cpp'],
  cpp:        ['dsa', 'competitive', 'os'],
  java:       ['dsa', 'sysdesign', 'web'],
  web:        ['java', 'sysdesign', 'python'],
  dbms:       ['sysdesign', 'os', 'cn'],
  os:         ['cn', 'sysdesign', 'cpp'],
  cn:         ['os', 'sysdesign', 'dbms'],
  ml:         ['ai', 'python', 'dsa'],
  ai:         ['ml', 'python', 'dsa'],
  sysdesign:  ['dbms', 'cn', 'os'],
  competitive:['dsa', 'cpp', 'python'],
  python:     ['ml', 'dsa', 'web']
};

function renderRecommendations(){
  const anchor = COURSES.filter(c => c.progress > 0 && c.progress < 100)
    .sort((a, b) => b.progress - a.progress)[0] || COURSES[0];

  const picks = (RELATED[anchor.id] || [])
    .map(byId)
    .filter(c => c && c.id !== anchor.id)
    .slice(0, 3);

  $('#recoReason').textContent = `Because you are learning ${anchor.title}.`;

  const notes = {};
  picks.forEach(c => {
    notes[c.id] = c.progress > 0
      ? `Builds on ${anchor.title} — you are already ${c.progress}% in.`
      : `Next step after ${anchor.title}. ${c.desc}`;
  });

  renderCourses($('#recoGrid'), picks, 'Start a course and recommendations appear here.', notes);
}

/* ------------------------------------------------------- 9. STATS */

function renderStats(){
  const enrolled = COURSES.filter(c => c.progress > 0).length;
  const completed = COURSES.filter(c => c.progress === 100).length;

  const stats = [
    { label: 'Courses enrolled',  value: enrolled,           suffix: '',   icon: '<path d="M5 5h6v14H5z"/><path d="M13 5h6v14h-6z"/>' },
    { label: 'Courses completed', value: completed,          suffix: '',   icon: '<circle cx="12" cy="12" r="8"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/>' },
    { label: 'Hours learned',     value: state.hoursLearned, suffix: '',   icon: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 1.8"/>' },
    { label: 'Current streak',    value: state.streak,       suffix: ' d', icon: '<path d="M12 3c2.8 3.2 5 5.7 5 9a5 5 0 0 1-10 0c0-1.6.6-2.9 1.6-4.2.6 1 1.3 1.6 2.2 1.9-.6-2.4-.4-4.6 1.2-6.7z"/>' },
    { label: 'Certificates',      value: state.certificates, suffix: '',   icon: '<circle cx="12" cy="10" r="5"/><path d="M8.5 14l-1 7 4.5-2.4L16.5 21l-1-7"/>' }
  ];

  $('#statGrid').innerHTML = stats.map(s => `
    <div class="stat">
      <span class="stat-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg></span>
      <p class="stat-value">${esc(s.value + s.suffix)}</p>
      <p class="stat-label">${esc(s.label)}</p>
    </div>`).join('');

  // Count up once, the first time the stats scroll into view.
  if (!statsAnimated && !prefersReducedMotion()){
    statsAnimated = true;
    const values = $$('#statGrid .stat-value');
    const watcher = new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      values.forEach((el, i) => countUp(el, stats[i].value, stats[i].suffix));
    }, { threshold: .4 });
    watcher.observe($('#statGrid'));
  }

  $('#sideStreak').textContent = state.streak;
}

let statsAnimated = false;

function prefersReducedMotion(){
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Tick a number up from zero over ~900ms. */
function countUp(el, target, suffix){
  const start = performance.now();
  const step = now => {
    const t = Math.min(1, (now - start) / 900);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ------------------------------------------------------- 10. MODAL */

let lastFocused = null;

function openCourse(id){
  const c = byId(id);
  if (!c) return;

  lastFocused = document.activeElement;
  trackRecent(id);

  $('#modalBody').innerHTML = `
    <div class="course-art modal-art" data-cat="${esc(c.category)}">
      <div>
        <span class="course-emoji" aria-hidden="true">${c.emoji}</span>
        <h2 id="modalTitle">${esc(c.title)}</h2>
      </div>
    </div>
    <div class="modal-inner">
      <p class="lead">${esc(c.desc)}</p>
      <div class="meta">
        <span class="tag tag-level" data-level="${esc(c.level)}">${esc(c.level)}</span>
        <span class="tag">${c.duration} hrs</span>
        <span class="tag">${c.lessons} lessons</span>
        <span class="tag">${c.learners.toLocaleString('en-IN')} learners</span>
      </div>

      <h4>Your progress</h4>
      <div class="bar"><i></i></div>
      <div class="bar-note"><span>${c.progress}% complete</span><span>${Math.round(c.lessons * c.progress / 100)} of ${c.lessons} lessons</span></div>

      <h4>What you will cover</h4>
      <ul class="syllabus">
        ${c.syllabus.map((s, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${esc(s)}</li>`).join('')}
      </ul>

      <div class="modal-actions">
        <button class="btn btn-solid" type="button" data-lesson="${c.id}">
          ${c.progress === 100 ? 'Revise a lesson' : 'Start next lesson'}
        </button>
        <button class="btn btn-ghost" type="button" data-ask="${c.id}">Ask a doubt on this</button>
      </div>
    </div>`;

  setBar($('#modalBody .bar'), c.progress);
  $('#courseModal').hidden = false;
  document.body.classList.add('no-scroll');
  $('#modalClose').focus();
}

function closeModal(){
  $('#courseModal').hidden = true;
  document.body.classList.remove('no-scroll');
  if (lastFocused) lastFocused.focus();
}

/** Completing a lesson nudges the progress bars everywhere. */
function completeLesson(id){
  const c = byId(id);
  if (!c) return;
  const step = Math.max(2, Math.round(100 / c.lessons));
  c.progress = Math.min(100, c.progress + step);
  state.hoursLearned += 1;

  applyFilters();
  renderLearning();
  renderRecommendations();
  renderStats();
  openCourse(id);
  toast(c.progress === 100 ? `${c.title} completed` : `Lesson done — ${c.title} at ${c.progress}%`);
}

/* -------------------------------------------- 11. NAVIGATION AND EVENTS */

function openSidebar(){
  $('#sidebar').classList.add('is-open');
  $('#scrim').hidden = false;
  $('#menuToggle').setAttribute('aria-expanded', 'true');
}
function closeSidebar(){
  $('#sidebar').classList.remove('is-open');
  $('#scrim').hidden = true;
  $('#menuToggle').setAttribute('aria-expanded', 'false');
}

/** Highlight the nav item for whichever section is on screen. */
function watchSections(){
  const sections = $$('main section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      $$('.side-link').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
      $$('.top-link').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
}

function init(){
  // First paint
  applyFilters();
  renderLearning();
  renderRecommendations();
  renderStats();
  greetAssistant();
  trackRecent('dsa');
  $('#year').textContent = new Date().getFullYear();
  watchSections();

  /* --- hero --- */
  const heroInput = $('#heroSearchInput');
  const suggestBox = $('#heroSuggest');

  /** Drop-down of matching course titles while the learner types. */
  function showSuggestions(){
    const q = heroInput.value.trim().toLowerCase();
    if (q.length < 2){ hideSuggestions(); return; }

    const hits = COURSES.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.keywords.some(k => k.includes(q))
    ).slice(0, 5);

    if (!hits.length){ hideSuggestions(); return; }

    suggestBox.innerHTML = hits.map(c => `
      <li role="option"><button type="button" data-suggest="${c.id}">
        <span class="s-emoji" aria-hidden="true">${c.emoji}</span>
        <span>${esc(c.title)}</span>
        <span class="s-cat">${esc(c.category)}</span>
      </button></li>`).join('');
    suggestBox.hidden = false;
    heroInput.setAttribute('aria-expanded', 'true');
  }

  function hideSuggestions(){
    suggestBox.hidden = true;
    heroInput.setAttribute('aria-expanded', 'false');
  }

  heroInput.addEventListener('input', showSuggestions);
  heroInput.addEventListener('focus', showSuggestions);
  heroInput.addEventListener('keydown', e => { if (e.key === 'Escape') hideSuggestions(); });
  suggestBox.addEventListener('click', e => {
    const btn = e.target.closest('[data-suggest]');
    if (!btn) return;
    hideSuggestions();
    openCourse(btn.dataset.suggest);
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('#heroSearchForm')) hideSuggestions();
  });

  $('#heroSearchForm').addEventListener('submit', e => {
    e.preventDefault();
    hideSuggestions();
    const q = heroInput.value.trim();
    $('#aiSearchInput').value = q;
    aiSearch(q);
    goTo('ai-search');
  });
  $('#exploreBtn').addEventListener('click', () => goTo('courses'));
  $('#askAiBtn').addEventListener('click', () => {
    goTo('assistant');
    setTimeout(() => $('#chatInput').focus(), 500);
  });

  /* --- AI search --- */
  $('#aiSearchForm').addEventListener('submit', e => {
    e.preventDefault();
    aiSearch($('#aiSearchInput').value);
  });
  $('#suggestionChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    $('#aiSearchInput').value = chip.dataset.q;
    aiSearch(chip.dataset.q);
  });
  // Microphone is a UI demo only — no speech API is used.
  $('#micBtn').addEventListener('click', () => {
    const btn = $('#micBtn');
    btn.classList.add('is-live');
    toast('Voice input is a UI demo in this prototype');
    setTimeout(() => btn.classList.remove('is-live'), 1400);
  });

  /* --- doubt assistant --- */
  $('#chatForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#chatInput');
    const q = input.value.trim();
    if (!q) return;
    askAssistant(q);
    input.value = '';
  });
  $('#chatChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) askAssistant(chip.dataset.q);
  });
  $('#clearChat').addEventListener('click', greetAssistant);

  /* --- course filters --- */
  $('#courseSearch').addEventListener('input', e => { state.search = e.target.value; applyFilters(); });
  $('#categoryFilter').addEventListener('change', e => { state.category = e.target.value; applyFilters(); });
  $('#levelFilter').addEventListener('change', e => { state.level = e.target.value; applyFilters(); });
  $('#sortBy').addEventListener('change', e => { state.sort = e.target.value; applyFilters(); });
  $('#resetFilters').addEventListener('click', resetFilters);

  /* --- modal --- */
  $('#modalClose').addEventListener('click', closeModal);
  $('#courseModal').addEventListener('click', e => {
    if (e.target.matches('[data-close-modal]')) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){
      if (!$('#courseModal').hidden) closeModal();
      closeSidebar();
    }
  });

  /* --- sidebar / mobile menu --- */
  $('#menuToggle').addEventListener('click', () => {
    $('#sidebar').classList.contains('is-open') ? closeSidebar() : openSidebar();
  });
  $('#scrim').addEventListener('click', closeSidebar);

  /* --- top bar --- */
  $('#navSearchBtn').addEventListener('click', () => {
    goTo('ai-search');
    setTimeout(() => $('#aiSearchInput').focus(), 500);
  });
  $('#profileBtn').addEventListener('click', () => goTo('my-learning'));
  $('#loginBtn').addEventListener('click', () => toast('Login is not part of this front-end demo'));

  /* --- one delegated handler for every [data-*] control on the page --- */
  document.addEventListener('click', e => {
    const view   = e.target.closest('[data-view]');
    const lesson = e.target.closest('[data-lesson]');
    const ask    = e.target.closest('[data-ask]');
    const jump   = e.target.closest('[data-scroll-to]');
    const reset  = e.target.closest('[data-reset]');
    const anchor = e.target.closest('a[data-scroll]');

    if (view)   { openCourse(view.dataset.view); return; }
    if (lesson) { completeLesson(lesson.dataset.lesson); return; }
    if (ask){
      const c = byId(ask.dataset.ask);
      closeModal();
      goTo('assistant');
      setTimeout(() => {
        $('#chatInput').value = 'What is ' + c.title + '?';
        $('#chatInput').focus();
      }, 500);
      return;
    }
    if (jump)  { goTo(jump.dataset.scrollTo); return; }
    if (reset) { resetFilters(); goTo('courses'); return; }
    if (anchor){
      e.preventDefault();
      goTo(anchor.getAttribute('href').slice(1));
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
