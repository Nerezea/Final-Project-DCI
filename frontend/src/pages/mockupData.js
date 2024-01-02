export const mockupUserin = {
  email: "parentname@example.com",
  password: "password123",
  fullName: "Albin Example",
  role: "parent",
  profile: {
    school: "Grundschule unter den Kastanien",
    class: "1B",
    birthDay: "22.01.2017",
    image: "path/to/imageOfStudent.jpg",
  },
};
export const mockupUser = {
  email: "teachername@example.com",
  password: "password1234",
  fullName: "teacher Example",
  role: "teacher",
  profile: {
    school: "Grundschule unter den Kastanien",
    image: "/path/to/image.jpg",
  },
};
export const menuTeachers = [
  { label: "NEWSFEED", to: "/teacher/feed" },
  { label: "KALENDAR", to: "/teacher/calendar" },
  { label: "KRANKMELDUNG", to: "/teacher/abwesenheit" },
  { label: "FORTBILDUNGEN", to: "/teacher/events" },
  { label: "KLASSENLISTE", to: "/teacher/klassenliste" },
  { label: "VERTRETUNGSPLÄNE", to: "/teacher/vertretungsplaene" },
];

export const logInTeacher = {
  label: "Klasse 1B - Albin Maier",
  to: "teacher/profile",
};

export const menuParents = [
  { label: "NEWSFEED", to: "/parent/feed" },
  { label: "KALENDAR", to: "/parent/calendar" },
  { label: "KRANKMELDUNG", to: "/parent/abwesenheit" },
  { label: "KLASSENAUSFLÜGE", to: "/parent/events" },
  { label: "KLASSENLISTE", to: "/parent/klassenliste" },
  { label: "VERTRETUNGSPLÄNE", to: "/parent/vertretungsplaene" },
];

export const teacherButtonsNewsfeed = [
  { label: "❤ - POSTS", to: "/newsfeed/posts" },
  { label: "POST ERSTELLEN", to: "/newsfeed/create" },
  { label: "POST BEARBEITEN", to: "/newsfeed/patch" },
  { label: "POST LÖSCHEN", to: "/newsfeed/delete" },
];

export const teacherButtonsCalendar = [
  { label: "EVENT ERSTELLEN", action: "createEvent" },
  { label: "EVENT BEARBEITEN", action: "updateEvent" },
  { label: "EVENT LÖSCHEN", action: "deleteEvent" },
];

export const parentButtonsNewsfeed = ["❤ - POSTS"];

export const parentButtonsCalendar = ["❤ - EVENTS"];

export const marqueeTxt = "Einschulung am 21.08.2023";

export const events = [
  {
    title: "Einschulung",
    date: "21.08.2024",
    info: "Endlich ist es soweit... Dieser Tag ist etwas ganz Besonderes. Begrüßt die Neuzugänge gemeinsam mit den Eltern und Lehrer bei dem Einschulungsfest am 21.08.2023.",
    link: "Mehr Infos...",
    img: "/farm-animal.jpg",
    newsfeedId: "event001",
  },
  {
    title: "Einschulung",
    date: "21.08.2024",
    info: "Endlich ist es soweit... Dieser Tag ist etwas ganz Besonderes. Begrüßt die Neuzugänge gemeinsam mit den Eltern und Lehrer bei dem Einschulungsfest am 21.08.2023.",
    link: "Mehr Infos...",
    img: "",
    newsfeedId: "event002",
  },
  {
    title: "Einschulung",
    date: "21.08.2024",
    info: "Endlich ist es soweit... Dieser Tag ist etwas ganz Besonderes. Begrüßt die Neuzugänge gemeinsam mit den Eltern und Lehrer bei dem Einschulungsfest am 21.08.2023.",
    link: "Mehr Infos...",
    img: "/farm-animal.jpg",
    newsfeedId: "event003",
  },
  {
    title: "Wissenschaftswettbewerb",
    date: "15.09.2024",
    info: "Unsere Schule richtet einen spannenden Wissenschaftswettbewerb für alle Klassen aus. Spannende Experimente und Projekte erwarten euch!",
    link: "Mehr Infos...",
    img: "/farm-animal.jpg",
    newsfeedId: "event004",
  },
  {
    title: "Kunstausstellung der 4. Klassen",
    date: "22.10.2024",
    info: "Bewundert die kreativen Kunstwerke unserer Viertklässler bei der jährlichen Kunstausstellung in der Aula.",
    link: "Mehr Infos...",
    img: "/art-exhibition.jpg",
    newsfeedId: "event005",
  },
  {
    title: "Herbstlauf",
    date: "05.11.2024",
    info: "Nehmt am Herbstlauf teil und helft uns dabei, Spenden für neue Spielgeräte zu sammeln. Jeder Kilometer zählt!",
    link: "Mehr Infos...",
    img: "/autumn-run.jpg",
    newsfeedId: "event006",
  },
  {
    title: "Weihnachtskonzert",
    date: "16.12.2024",
    info: "Erlebt musikalische Darbietungen unserer Schüler beim Weihnachtskonzert. Ein festlicher Abend für die ganze Familie!",
    link: "Mehr Infos...",
    img: "/farm-animal.jpg",
    newsfeedId: "event007",
  },
  {
    title: "Tag der offenen Tür",
    date: "26.01.2025",
    info: "Entdeckt, was unsere Schule zu bieten hat. Spiele, Führungen und Einblicke in den Schulalltag erwarten euch!",
    link: "Mehr Infos...",
    img: "/open-day.jpg",
    newsfeedId: "event008",
  },
  {
    title: "Frühjahrsputz",
    date: "14.03.2025",
    info: "Helft uns, das Schulgelände im Frühling auf Vordermann zu bringen. Gemeinsam macht das Aufräumen noch mehr Spaß!",
    link: "Mehr Infos...",
    img: "/farm-animal.jpg",
    newsfeedId: "event009",
  },
  {
    title: "Osterbasteln",
    date: "04.04.2025",
    info: "Seid kreativ beim Osterbasteln! Wir gestalten bunte Eier und lustige Frühlingsdekorationen.",
    link: "Mehr Infos...",
    img: "/farm-animal.jpg",
    newsfeedId: "event010",
  },
  {
    title: "Sportfest",
    date: "17.05.2025",
    info: "Unser alljährliches Sportfest steht an! Freut euch auf einen Tag voller sportlicher Aktivitäten und Spiele.",
    link: "Mehr Infos...",
    img: "/farm-animal.jpg",
    newsfeedId: "event011",
  },
  {
    title: "Sommerkonzert",
    date: "20.06.2025",
    info: "Das Sommerkonzert bietet musikalische Darbietungen von Schülern aller Klassenstufen. Ein Highlight zum Schuljahresende!",
    link: "Mehr Infos...",
    img: "/farm-animal.jpg",
    newsfeedId: "event012",
  },
  {
    title: "Abschlussfeier der 4. Klassen",
    date: "28.07.2025",
    info: "Wir verabschieden unsere Viertklässler mit einer großen Abschlussfeier. Wir sind stolz auf euch und eure Leistungen!",
    link: "Mehr Infos...",
    img: "/graduation-party.jpg",
    newsfeedId: "event013",
  },
];

export const eventsC = [
  {
    title: "Winterferien",
    start: "05.02.2024",
    end: "10.02.2024",
    description: "Winterferien",
    color: "#fef9c3",
    textColor: "black",
    url: "",
    img: "",
  },

  {
    title: "Osterferien",
    start: "25.03.2024",
    end: "05.04.2024",
    description: "Osterferien",
    color: "#fef9c3",
    textColor: "black",

    url: "",
    img: "",
  },
  {
    title: "Pfingsten",
    start: "10.05.2024",
    end: "",
    description: "Pfingsten",
    color: "#fef9c3",
    textColor: "black",

    url: "",
    img: "",
  },
  {
    title: "Sommerferien",
    start: "18.07.2024",
    end: "30.08.2024",
    description: "Sommerferien",
    color: "#fef9c3",
    textColor: "black",

    url: "",
    img: "",
  },
  {
    title: "Herbstferien",
    start: "21.10.2024",
    end: "02.11.2024",
    description: "Herbstferien",
    color: "#fef9c3",
    textColor: "black",

    url: "",
    img: "",
  },
  {
    title: "Weihnachtsferien",
    start: "23.12.2024",
    end: "31.12.2024",
    description: "Weihnachtsferien",
    color: "#fef9c3",
    textColor: "black",

    url: "",
    img: "",
  },
  {
    title: "Einschulung",
    start: "21.08.2023",
    end: "",
    description:
      "Endlich ist es soweit... Dieser Tag ist etwas ganz Besonderes. Begrüßt die Neuzugänge gemeinsam mit den Eltern und Lehrer bei dem Einschulungsfest am 21.08.2023.",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/farm-animal.jpg",
    newsfeedId: "event001",
  },
  {
    title: "Einschulung",
    start: "21.08.2023",
    end: "",
    description:
      "Endlich ist es soweit... Dieser Tag ist etwas ganz Besonderes. Begrüßt die Neuzugänge gemeinsam mit den Eltern und Lehrer bei dem Einschulungsfest am 21.08.2023.",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "",
    newsfeedId: "event002",
  },
  {
    title: "Einschulung",
    start: "21.08.2023",
    end: "",
    description:
      "Endlich ist es soweit... Dieser Tag ist etwas ganz Besonderes. Begrüßt die Neuzugänge gemeinsam mit den Eltern und Lehrer bei dem Einschulungsfest am 21.08.2023.",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/farm-animal.jpg",
    newsfeedId: "event003",
  },
  {
    title: "Wissenschaftswettbewerb",
    start: "15.09.2023",
    end: "",
    description:
      "Unsere Schule richtet einen spannenden Wissenschaftswettbewerb für alle Klassen aus. Spannende Experimente und Projekte erwarten euch!",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/farm-animal.jpg",
    newsfeedId: "event004",
  },
  {
    title: "Kunstausstellung der 4. Klassen",
    start: "22.10.2023",
    end: "",
    description:
      "Bewundert die kreativen Kunstwerke unserer Viertklässler bei der jährlichen Kunstausstellung in der Aula.",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/art-exhibition.jpg",
    newsfeedId: "event005",
  },
  {
    title: "Herbstlauf",
    start: "05.11.2023",
    end: "",
    description:
      "Nehmt am Herbstlauf teil und helft uns dabei, Spenden für neue Spielgeräte zu sammeln. Jeder Kilometer zählt!",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/autumn-run.jpg",
    newsfeedId: "event006",
  },
  {
    title: "Weihnachtskonzert",
    start: "19.12.2023",
    end: "",
    description:
      "Erlebt musikalische Darbietungen unserer Schüler beim Weihnachtskonzert. Ein festlicher Abend für die ganze Familie!",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/farm-animal.jpg",
    newsfeedId: "event007",
  },
  {
    title: "Tag der offenen Tür",
    start: "22.01.2025",
    end: "",
    description:
      "Entdeckt, was unsere Schule zu bieten hat. Spiele, Führungen und Einblicke in den Schulalltag erwarten euch!",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/open-day.jpg",
    newsfeedId: "event008",
  },
  {
    title: "Frühjahrsputz",
    start: "14.03.2024",
    end: "",
    description:
      "Helft uns, das Schulgelände im Frühling auf Vordermann zu bringen. Gemeinsam macht das Aufräumen noch mehr Spaß!",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/farm-animal.jpg",
    newsfeedId: "event009",
  },
  {
    title: "Osterbasteln",
    start: "04.04.2024",
    end: "",
    description:
      "Seid kreativ beim Osterbasteln! Wir gestalten bunte Eier und lustige Frühlingsdekorationen.",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/farm-animal.jpg",
    newsfeedId: "event010",
  },
  {
    title: "Sportfest",
    start: "17.05.2024",
    end: "",
    description:
      "Unser alljährliches Sportfest steht an! Freut euch auf einen Tag voller sportlicher Aktivitäten und Spiele.",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/farm-animal.jpg",
    newsfeedId: "event011",
  },
  {
    title: "Sommerkonzert",
    start: "20.06.2024",
    end: "",
    descritption:
      "Das Sommerkonzert bietet musikalische Darbietungen von Schülern aller Klassenstufen. Ein Highlight zum Schuljahresende!",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/farm-animal.jpg",
    newsfeedId: "event012",
  },
  {
    title: "Abschlussfeier der 4. Klassen",
    start: "28.07.2024",
    end: "",
    description:
      "Wir verabschieden unsere Viertklässler mit einer großen Abschlussfeier. Wir sind stolz auf euch und eure Leistungen!",
    url: "Mehr Infos...",
    editable: true,
    color: "#721fdc",
    textColor: "white",
    img: "/graduation-party.jpg",
    newsfeedId: "event013",
  },
];
