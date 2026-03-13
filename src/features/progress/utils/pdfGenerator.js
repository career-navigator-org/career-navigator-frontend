import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Regular.ttf',
    italics: 'Roboto-Regular.ttf',
    bolditalics: 'Roboto-Regular.ttf'
  }
};

export const generateResumePDF = (userData, modulesData) => {
  const modules = Array.isArray(modulesData) ? modulesData : [];
  
  const fullName = userData?.fullName || 'Пользователь';
  // const birthDate = userData?.birthDate || '—';
  const educationStatus = userData?.educationStatus || '—';
  const city = userData?.city || '—';
  const career = userData?.career || '—';
  const selectedSkills = userData?.selectedSkills || [];

  const allCompletedSkills = [];
  let totalCompleted = 0;
  let totalSkills = 0;
  
  modules.forEach(module => {
    if (module && module.skills) {
      const moduleCompleted = module.skills.filter(s => s.completed).length;
      totalCompleted += moduleCompleted;
      totalSkills += module.skills.length;
      
      module.skills.forEach(skill => {
        if (skill.completed) {
          allCompletedSkills.push({
            module: module.title || 'Модуль',
            skill: skill.title || 'Навык'
          });
        }
      });
    }
  });

  const allUniqueSkills = [...allCompletedSkills];
  selectedSkills.forEach(skill => {
    const exists = allCompletedSkills.some(s => s.skill === skill);
    if (!exists && skill) {
      allUniqueSkills.push({
        module: 'Начальные навыки',
        skill: skill
      });
    }
  });

  // const progressPercent = totalSkills > 0 ? Math.round((totalCompleted / totalSkills) * 100) : 0;
  const today = new Date();
  const dateStr = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
  
  // const formattedBirthDate = birthDate !== '—' 
  //   ? birthDate.split('-').reverse().join('.') 
  //   : '—';

  const skillsByModule = {};
  allCompletedSkills.forEach(item => {
    if (!skillsByModule[item.module]) {
      skillsByModule[item.module] = [];
    }
    skillsByModule[item.module].push(item.skill);
  });

  const achievementsContent = [];
  
  if (Object.keys(skillsByModule).length > 0) {
    Object.keys(skillsByModule).forEach(moduleName => {
      achievementsContent.push(
        { text: moduleName, fontSize: 12, bold: true, margin: [0, 10, 0, 5] }
      );

      skillsByModule[moduleName].forEach(skill => {
        achievementsContent.push({
          text: `  • ${skill}`,
          fontSize: 10,
          color: '#333333',
          margin: [0, 2, 0, 2]
        });
      });

      achievementsContent.push({ text: '', margin: [0, 0, 0, 5] });
    });
  } else {
    achievementsContent.push(
      { text: 'Пока нет достижений', fontSize: 11, color: '#999999', italics: true, margin: [0, 5, 0, 5] }
    );
  }

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [35, 40, 35, 40],
    content: [
      {
        columns: [
          {
            width: '50%',
            stack: [
              { 
                text: fullName.toUpperCase(), 
                fontSize: 28, 
                bold: true, 
                color: '#000000',
                margin: [0, 15, 0, 5]
              }
            ]
          },

          {
            width: '50%',
            stack: [
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 80,
                    h: 80,
                    r: 5,
                    color: '#f5f5f5',
                    lineColor: '#cccccc',
                    lineWidth: 1
                  }
                ],
                alignment: 'right',
                margin: [0, 0, 0, 15]
              },
              {
                text: 'ФОТО',
                alignment: 'right',
                fontSize: 8,
                color: '#999999',
                margin: [0, -55, 0, 15]
              },
              
              {
                stack: [
                  { text: '📞 +7 (999) 123-45-67', alignment: 'right', fontSize: 10, color: '#333333', margin: [0, 2, 0, 2] },
                  { text: `📍 ${city}`, alignment: 'right', fontSize: 10, color: '#333333', margin: [0, 2, 0, 2] },
                  { text: '✉ email@example.com', alignment: 'right', fontSize: 10, color: '#333333', margin: [0, 2, 0, 5] }
                ],
                margin: [0, 20, 0, 0]
              }
            ],
            alignment: 'right'
          }
        ],
        margin: [0, 0, 0, 25]
      },

      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 540, y2: 0, lineWidth: 1, lineColor: '#000000' }],
        margin: [0, 0, 0, 20]
      },

      {
        columns: [
          {
            width: '35%',
            stack: [
              {
                stack: [
                  { text: 'О СЕБЕ', style: 'sectionTitle', margin: [0, 0, 0, 8] },
                  { 
                    text: '—',
                    fontSize: 11,
                    color: '#999999',
                    italics: true,
                    margin: [0, 0, 0, 20]
                  }
                ]
              },

              {
                stack: [
                  { text: 'ЦЕЛЬ', style: 'sectionTitle', margin: [0, 15, 0, 8] },
                  { 
                    text: career,
                    fontSize: 14,
                    bold: true,
                    color: '#000000',
                    margin: [0, 0, 0, 5]
                  },
                  { 
                    text: 'Стремлюсь развиваться в этом направлении',
                    fontSize: 10,
                    color: '#666666',
                    margin: [0, 0, 0, 20]
                  }
                ]
              }
            ]
          },

          {
            width: '65%',
            stack: [
              {
                stack: [
                  { text: 'НАВЫКИ И ОБРАЗОВАНИЕ', style: 'sectionTitle', margin: [0, 0, 0, 8] },

                  {
                    columns: [
                      {
                        width: '30%',
                        text: 'Образование:',
                        fontSize: 11,
                        bold: true,
                        color: '#333333'
                      },
                      {
                        width: '70%',
                        text: educationStatus,
                        fontSize: 11,
                        color: '#333333'
                      }
                    ],
                    margin: [0, 5, 0, 15]
                  },

                  { text: `Всего навыков: ${totalSkills}`, fontSize: 11, margin: [0, 5, 0, 2] },
                  { text: `Изучено: ${totalCompleted}`, fontSize: 11, margin: [0, 2, 0, 10] },

                  ...(selectedSkills.length > 0 ? [
                    { text: 'Базовые знания:', fontSize: 12, bold: true, margin: [0, 5, 0, 5] },
                    {
                      ul: selectedSkills.slice(0, 8),
                      fontSize: 10,
                      margin: [0, 0, 0, 5]
                    },
                    ...(selectedSkills.length > 8 ? [{ text: `...и еще ${selectedSkills.length - 8}`, fontSize: 10, color: '#666666', margin: [0, 2, 0, 10] }] : [])
                  ] : [])
                ],
                margin: [0, 0, 0, 20]
              },

              {
                stack: [
                  { text: 'ДОСТИЖЕНИЯ', style: 'sectionTitle', margin: [0, 0, 0, 8] },
                  ...achievementsContent
                ]
              }
            ]
          }
        ]
      },

      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 540, y2: 0, lineWidth: 1, lineColor: '#cccccc' }],
        margin: [0, 30, 0, 10]
      },
      {
        text: `Резюме составлено: ${dateStr}`,
        alignment: 'right',
        fontSize: 9,
        color: '#999999'
      }
    ],
    
    styles: {
      sectionTitle: {
        fontSize: 16,
        bold: true,
        color: '#000000',
        decoration: 'underline',
        decorationStyle: 'solid',
        decorationColor: '#000000'
      }
    },
    
    defaultStyle: {
      font: 'Roboto',
      fontSize: 11,
      color: '#333333'
    }
  };

  pdfMake.createPdf(docDefinition).download(`резюме-${fullName.replace(/[^a-zа-яё0-9]/gi, '_')}-${dateStr}.pdf`);
};