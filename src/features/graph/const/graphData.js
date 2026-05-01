export const USER_DATA = {
    "id": 1,
    "name": "Иван Иванов",
    "skills": [
        { "id": 101, "name": "React" },
        { "id": 102, "name": "Node.js" },
        { "id": 103, "name": "TypeScript" },
        { "id": 104, "name": "SQL" },
        { "id": 105, "name": "Docker" }
    ]
};

export const SKILLS_DATA = [
    // Web Development
    { "id": 101, "name": "React" }, { "id": 102, "name": "Node.js" }, { "id": 103, "name": "TypeScript" },
    { "id": 104, "name": "SQL" }, { "id": 105, "name": "Docker" }, { "id": 106, "name": "HTML5" },
    { "id": 107, "name": "CSS3" }, { "id": 108, "name": "JavaScript" }, { "id": 109, "name": "Redux" },
    { "id": 110, "name": "Next.js" }, { "id": 111, "name": "GraphQL" }, { "id": 112, "name": "NestJS" },
    // DevOps & Infrastructure
    { "id": 113, "name": "Kubernetes" }, { "id": 114, "name": "AWS" }, { "id": 115, "name": "Terraform" },
    { "id": 116, "name": "Linux" }, { "id": 117, "name": "Nginx" }, { "id": 118, "name": "CI/CD" },
    { "id": 119, "name": "Git" }, { "id": 120, "name": "Prometheus" },
    // Mobile Development
    { "id": 121, "name": "Swift" }, { "id": 122, "name": "Kotlin" }, { "id": 123, "name": "React Native" },
    { "id": 124, "name": "Flutter" }, { "id": 125, "name": "Objective-C" },
    // Data Science & AI
    { "id": 126, "name": "Python" }, { "id": 127, "name": "PyTorch" }, { "id": 128, "name": "TensorFlow" },
    { "id": 129, "name": "Pandas" }, { "id": 130, "name": "NumPy" }, { "id": 131, "name": "Scikit-learn" },
    { "id": 132, "name": "Tableau" }, { "id": 133, "name": "R" },
    // Design & UI/UX
    { "id": 134, "name": "Figma" }, { "id": 135, "name": "Adobe XD" }, { "id": 136, "name": "UI/UX" },
    { "id": 137, "name": "Sketch" }, { "id": 138, "name": "Principle" },
    // Backend & Languages
    { "id": 139, "name": "Go" }, { "id": 140, "name": "Rust" }, { "id": 141, "name": "Java" },
    { "id": 142, "name": "Spring Boot" }, { "id": 143, "name": "C++" }, { "id": 144, "name": "C#" },
    { "id": 145, "name": "MongoDB" }, { "id": 146, "name": "Redis" }, { "id": 147, "name": "Kafka" },
    { "id": 148, "name": "Elasticsearch" }, { "id": 149, "name": "PHP" }, { "id": 150, "name": "Laravel" }
];

export const PROFESSION_DATA = [
    {
        "id": 201, "name": "Frontend Developer",
        "skills": [{ "id": 101, "name": "React" }, { "id": 103, "name": "TypeScript" }, { "id": 106, "name": "HTML5" }, { "id": 107, "name": "CSS3" }]
    },
    {
        "id": 202, "name": "Backend Developer (Node)",
        "skills": [{ "id": 102, "name": "Node.js" }, { "id": 104, "name": "SQL" }, { "id": 112, "name": "NestJS" }, { "id": 146, "name": "Redis" }]
    },
    {
        "id": 203, "name": "Fullstack Developer",
        "skills": [{ "id": 101, "name": "React" }, { "id": 102, "name": "Node.js" }, { "id": 103, "name": "TypeScript" }, { "id": 105, "name": "Docker" }]
    },
    {
        "id": 204, "name": "DevOps Engineer",
        "skills": [{ "id": 105, "name": "Docker" }, { "id": 113, "name": "Kubernetes" }, { "id": 115, "name": "Terraform" }, { "id": 118, "name": "CI/CD" }]
    },
    {
        "id": 205, "name": "Data Scientist",
        "skills": [{ "id": 126, "name": "Python" }, { "id": 129, "name": "Pandas" }, { "id": 131, "name": "Scikit-learn" }, { "id": 104, "name": "SQL" }]
    },
    {
        "id": 206, "name": "Mobile Developer (iOS)",
        "skills": [{ "id": 121, "name": "Swift" }, { "id": 119, "name": "Git" }, { "id": 125, "name": "Objective-C" }]
    },
    {
        "id": 207, "name": "Mobile Developer (Android)",
        "skills": [{ "id": 122, "name": "Kotlin" }, { "id": 119, "name": "Git" }, { "id": 141, "name": "Java" }]
    },
    {
        "id": 208, "name": "UI/UX Designer",
        "skills": [{ "id": 134, "name": "Figma" }, { "id": 136, "name": "UI/UX" }, { "id": 137, "name": "Sketch" }]
    },
    {
        "id": 209, "name": "ML Engineer",
        "skills": [{ "id": 126, "name": "Python" }, { "id": 127, "name": "PyTorch" }, { "id": 128, "name": "TensorFlow" }, { "id": 130, "name": "NumPy" }]
    },
    {
        "id": 210, "name": "Java Developer",
        "skills": [{ "id": 141, "name": "Java" }, { "id": 142, "name": "Spring Boot" }, { "id": 104, "name": "SQL" }, { "id": 105, "name": "Docker" }]
    },
    {
        "id": 211, "name": "SRE Engineer",
        "skills": [{ "id": 116, "name": "Linux" }, { "id": 117, "name": "Nginx" }, { "id": 120, "name": "Prometheus" }, { "id": 113, "name": "Kubernetes" }]
    },
    {
        "id": 212, "name": "Cloud Architect",
        "skills": [{ "id": 114, "name": "AWS" }, { "id": 115, "name": "Terraform" }, { "id": 113, "name": "Kubernetes" }, { "id": 105, "name": "Docker" }]
    },
    {
        "id": 213, "name": "Data Engineer",
        "skills": [{ "id": 104, "name": "SQL" }, { "id": 147, "name": "Kafka" }, { "id": 148, "name": "Elasticsearch" }, { "id": 126, "name": "Python" }]
    },
    {
        "id": 214, "name": "Game Developer (C++)",
        "skills": [{ "id": 143, "name": "C++" }, { "id": 143, "name": "OpenGL" }, { "id": 119, "name": "Git" }]
    },
    {
        "id": 215, "name": "Go Developer",
        "skills": [{ "id": 139, "name": "Go" }, { "id": 105, "name": "Docker" }, { "id": 147, "name": "Kafka" }, { "id": 111, "name": "GraphQL" }]
    },
    {
        "id": 216, "name": "React Native Developer",
        "skills": [{ "id": 123, "name": "React Native" }, { "id": 101, "name": "React" }, { "id": 103, "name": "TypeScript" }]
    },
    {
        "id": 217, "name": "QA Automation",
        "skills": [{ "id": 108, "name": "JavaScript" }, { "id": 126, "name": "Python" }, { "id": 118, "name": "CI/CD" }, { "id": 119, "name": "Git" }]
    },
    {
        "id": 218, "name": "PHP Developer",
        "skills": [{ "id": 149, "name": "PHP" }, { "id": 150, "name": "Laravel" }, { "id": 104, "name": "SQL" }, { "id": 108, "name": "JavaScript" }]
    },
    {
        "id": 219, "name": "Security Specialist",
        "skills": [{ "id": 116, "name": "Linux" }, { "id": 139, "name": "Go" }, { "id": 140, "name": "Rust" }, { "id": 105, "name": "Docker" }]
    },
    {
        "id": 220, "name": "Product Designer",
        "skills": [{ "id": 134, "name": "Figma" }, { "id": 136, "name": "UI/UX" }, { "id": 132, "name": "Tableau" }, { "id": 138, "name": "Principle" }]
    }
];
