import styles from './SkillCard.module.css'

export const SkillCard = ({
  skill,
  index,
  totalSkills,
  draggedSkill,
  toggleSkill,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
  getSkillPosition
}) => {

  const pos = getSkillPosition(index, totalSkills)

  return (
    <div
      className={`${styles.skillCard} 
  ${skill.completed ? styles.completed : ''} 
  ${draggedSkill?.id === skill.id ? styles.dragging : ''}`}
      style={{
        width: pos.width,
        height: pos.height,
        zIndex: draggedSkill?.id === skill.id ? 1000 : pos.zIndex,
        transition: draggedSkill
          ? 'none'
          : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      draggable
      onDragStart={(e) => handleDragStart(e, skill)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, skill)}
      onClick={() => toggleSkill(skill.id)}
    >
      <span className={styles.skillTitle}>{skill.title}</span>
    </div>
  )
}