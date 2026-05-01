import { useEffect, useState, useMemo } from "react";

import { sortSkillsByCount, filterProfBySkills } from "../utils/graphFilters";

import { USER_DATA, PROFESSION_DATA, SKILLS_DATA } from "../const/graphData";

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

                setUserData(USER_DATA);
                setProfData(PROFESSION_DATA);
                setSkillsData(SKILLS_DATA);

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

        nodes.push({
            id: userData.id,
            label: userData.name,
            level: 0,
            type: 'user'
        });

        userData.skills.forEach(skill => {
            if (!nodes.find(n => n.id === skill.id)) {
                nodes.push({ id: skill.id, label: skill.name, level: 1, type: 'skill' });
            }

            links.push({ source: userData.id, target: skill.id });
        });

        const arrProf = filterProfBySkills(profData, skillsData);
        const userSkillIds = new Set(userData.skills.map(skill => skill.id));

        arrProf.forEach(prof => {
            const hasSkills = prof.skills.filter(skill => userSkillIds.has(skill.id));
            let needsSkills = prof.skills.filter(skill => !userSkillIds.has(skill.id));
            needsSkills = sortSkillsByCount(profData, needsSkills);

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
