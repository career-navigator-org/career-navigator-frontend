// фильтруем профессии по скиллам
export const filterProfBySkills = (arrProf, arrSkills) => {
    const skillsIdSet = new Set(arrSkills.map(s => s.id));

    return arrProf.filter(prof => {
        return prof.skills.some(skill => skillsIdSet.has(skill.id));
    });
};


export const sortSkillsByCount = (arrProf, arrSkills) => {
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