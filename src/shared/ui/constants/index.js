export const careersDatabase = [
  'Frontend Developer',
  'Backend Developer', 
  'Fullstack Developer',
  'Data Scientist',
  'Data Analyst',
  'DevOps Engineer',
  'Project Manager',
  'Product Manager',
  'UX/UI Designer',
  'QA Engineer',
  'Mobile Developer (iOS)',
  'Mobile Developer (Android)',
  'System Administrator',
  'Business Analyst',
  'Tech Lead',
  'CTO',
  'Scrum Master',
  'Security Engineer',
  'Game Developer',
  'Embedded Developer'
].sort()

export const skillsDatabase = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'TypeScript', 'Next.js'],
  backend: ['Python', 'Java', 'PHP', 'Node.js', 'Go', 'Ruby', 'C#', 'SQL'],
  data: ['Python', 'SQL', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'R', 'Tableau'],
  devops: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Azure', 'Linux', 'Bash', 'Git'],
  design: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch', 'UI/UX'],
  languages: ['Английский', 'Немецкий', 'Французский', 'Китайский', 'Испанский'],
  other: ['Git', 'VS Code', 'Jira', 'Confluence', 'Postman', 'Excel']
}

export const citiesDatabase = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск',
  'Воронеж',
  'Пермь',
  'Волгоград',
  'Краснодар',
  'Саратов',
  'Тюмень',
  'Тольятти',
  'Ижевск'
]

export const educationOptions = [
  'Школьник',
  'Студент колледжа', 
  'Студент вуза',
  'Выпускник',
  'Самоучка',
  'Работающий специалист',
  'В поиске работы'
]

export const allSkills = [...new Set(Object.values(skillsDatabase).flat())].sort()

export const puzzleSkills = [
  { id: 1, title: 'HTML', completed: false, order: 1 },
  { id: 2, title: 'CSS', completed: false, order: 2 },
  { id: 3, title: 'JavaScript', completed: false, order: 3 },
  { id: 4, title: 'React', completed: false, order: 4 },
  { id: 5, title: 'Git', completed: false, order: 5 },
  { id: 6, title: 'TypeScript', completed: false, order: 6 },
  { id: 7, title: 'Redux', completed: false, order: 7 },
  { id: 8, title: 'Webpack', completed: false, order: 8 },
  { id: 9, title: 'Jest', completed: false, order: 9 },
  { id: 10, title: 'Docker', completed: false, order: 10 },
  { id: 11, title: 'GraphQL', completed: false, order: 11 },
  { id: 12, title: 'Next.js', completed: false, order: 12 }
]

export const professionData = {
  id: 1,
  title: 'Frontend Developer',
  description: 'Разработчик пользовательских интерфейсов'
}