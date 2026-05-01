import { useEffect, useState, useMemo } from "react";

export const useUserGraph = (userId) => {
    const [userData, setUserData] = useState(null);
    const [profData, setProfData] = useState(null);
    const [skillsData, setSkillsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!userId) return;

            try {
                setLoading(true);
                setError(null);

                // const [userRes, profRes, skillsRes] = await Promise.all([
                //     fetch(`http://localhost:8000/api/users/${userId}`),
                //     fetch(`http://localhost:8000/api/profession/${userId}`),
                //     fetch(`http://localhost:8000/api/skills/${userId}`)
                // ]);

                // if (!userRes.ok || !profRes.ok || !skillsRes.ok) {
                //     throw new Error("Ошибка при загрузке одного из ресурсов");
                // }

                // const [user, prof, skills] = await Promise.all([
                //     userRes.json(),
                //     profRes.json(),
                //     skillsRes.json()
                // ]);

                const user = {
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

                const skills = [
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

                const prof = [
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

                setUserData(user);
                setProfData(prof);
                setSkillsData(skills);

            } catch (err) {
                setError(err.message);
                console.error("Ошибка запроса:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [userId]);

    const graph = useMemo(() => {
        if (!userData) return { nodes: [], links: [] };

        const nodes = [];
        const links = [];

        // 1. Центральный узел (Пользователь)
        // ИСПОЛЬЗУЕМ userData.id (1), а не имя!
        nodes.push({
            id: userData.id,
            label: userData.name, // Имя храним отдельно для текста на графе
            level: 0,
            type: 'user'
        });

        // 2. Навыки пользователя (Level 1)
        userData.skills.forEach(skill => {
            // Проверяем, чтобы не дублировать узлы
            if (!nodes.find(n => n.id === skill.id)) {
                nodes.push({ id: skill.id, label: skill.name, level: 1, type: 'skill' });
            }
            // Связываем по ID (1 -> 101)
            links.push({ source: userData.id, target: skill.id });
        });

        const arrProf = filterProfBySkills(profData, skillsData);
        const userSkillIds = new Set(userData.skills.map(skill => skill.id));

        arrProf.forEach(prof => {
            const hasSkills = prof.skills.filter(skill => userSkillIds.has(skill.id));
            let needsSkills = prof.skills.filter(skill => !userSkillIds.has(skill.id));
            needsSkills = sortSkillsByCount(profData, needsSkills);

            // Теперь здесь всё четко: либо ID навыка (число), либо ID юзера (число 1)
            if (hasSkills.length > 0) {
                let currentNodeId = hasSkills[0].id;

                needsSkills.forEach((skill, index) => {
                    if (!nodes.find(n => n.id === skill.id)) {
                        nodes.push({
                            id: skill.id,
                            label: skill.name,
                            level: index + 2,
                            type: "skill-target"
                        });
                    }

                    links.push({ source: currentNodeId, target: skill.id });
                    currentNodeId = skill.id;
                });

                if (!nodes.find(n => n.id === prof.id)) {
                    nodes.push({
                        id: prof.id,
                        label: prof.name,
                        level: needsSkills.length + 2,
                        type: "profession"
                    });
                }

                links.push({ source: currentNodeId, target: prof.id });
            }
        });

        return { nodes, links };
    }, [userData, profData]);

    return { graph, loading, error };
};


// [
//   {
//     "id": 0,
//     "name": "string",
//     "skills": [
//       {
//         "id": 0,
//         "name": "string"
//       }
//     ]
//   }
// ]

// [
//   {
//     "id": 0,
//     "name": "string"
//   }
// ]

// фильтруем проф по скиллам
const filterProfBySkills = (arrProf, arrSkills) => {
    const skillsIdSet = new Set(arrSkills.map(s => s.id));

    return arrProf.filter(prof => {
        return prof.skills.some(skill => skillsIdSet.has(skill.id));
    });
};


const sortSkillsByCount = (arrProf, arrSkills) => {
    const countMap = {};

    arrProf.forEach(prof => {
        prof.skills.forEach(skill => {
            countMap[skill.id] = (countMap[skill.id] || 0) + 1;
        });
    });

    return [...arrSkills].sort((a, b) => {
        const countA = countMap[a.id] || 0;
        const countB = countMap[b.id] || 0;

        return countB - countA;
    });
};

// const graphData = {
//     nodes: [
//         { id: "", level: 0 },

//         // Изученные навыки
//         { id: "Фронтенд-разработка", level: 1 },
//         { id: "Анализ данных", level: 1 },
//         { id: "Кибербезопасность", level: 1 },
//         { id: "Программирование", level: 1 },
//         { id: "Управление проектами", level: 1 },

//         // Нужно изучить
//         { id: "JavaScript", level: 2 },
//         { id: "React", level: 2 },
//         { id: "Python", level: 2 },
//         { id: "SQL", level: 2 },
//         { id: "Алгоритмы", level: 2 },
//         { id: "Git", level: 2 },
//         { id: "Сетевые протоколы", level: 2 },
//         { id: "Шифрование", level: 2 },
//         { id: "Agile", level: 2 },
//         { id: "Коммуникация", level: 2 },

//         // Профессии
//         { id: "Веб-разработчик", level: 3 },
//         { id: "Data Scientist", level: 3 },
//         { id: "Специалист по кибербезопасности", level: 3 },
//         { id: "Инженер-программист", level: 3 },
//         { id: "Проджект-менеджер", level: 3 }
//     ],

//     links: [
//         // Пользователь → текущие навыки
//         { source: "Пользователь", target: "Фронтенд-разработка" },
//         { source: "Пользователь", target: "Анализ данных" },
//         { source: "Пользователь", target: "Кибербезопасность" },
//         { source: "Пользователь", target: "Программирование" },
//         { source: "Пользователь", target: "Управление проектами" },

//         // Навыки → Нужно изучить (умеренные пересечения)

//         // Фронтенд + Программирование
//         { source: "Фронтенд-разработка", target: "JavaScript" },
//         { source: "Программирование", target: "JavaScript" },

//         { source: "Фронтенд-разработка", target: "React" },

//         // Анализ данных + Программирование
//         { source: "Анализ данных", target: "Python" },
//         { source: "Программирование", target: "Python" },

//         { source: "Анализ данных", target: "SQL" },

//         // Программирование
//         { source: "Программирование", target: "Алгоритмы" },
//         { source: "Программирование", target: "Git" },

//         // Кибербезопасность
//         { source: "Кибербезопасность", target: "Сетевые протоколы" },
//         { source: "Кибербезопасность", target: "Шифрование" },

//         // Управление проектами
//         { source: "Управление проектами", target: "Agile" },
//         { source: "Управление проектами", target: "Коммуникация" },

//         // Нужно изучить → Профессии

//         { source: "JavaScript", target: "Веб-разработчик" },
//         { source: "React", target: "Веб-разработчик" },

//         { source: "Python", target: "Data Scientist" },
//         { source: "SQL", target: "Data Scientist" },

//         { source: "Алгоритмы", target: "Инженер-программист" },
//         { source: "Git", target: "Инженер-программист" },

//         { source: "Сетевые протоколы", target: "Специалист по кибербезопасности" },
//         { source: "Шифрование", target: "Специалист по кибербезопасности" },

//         { source: "Agile", target: "Проджект-менеджер" },
//         { source: "Коммуникация", target: "Проджект-менеджер" }
//     ]
// };

