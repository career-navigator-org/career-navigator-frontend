import { useState } from 'react'
import { puzzleSkills, professionData } from '../../../shared/ui/constants'

export const useSkills = () => {
  const [profession] = useState(professionData)
  const [skills, setSkills] = useState(puzzleSkills)
  const [draggedSkill, setDraggedSkill] = useState(null)

  const completedSkills = skills.filter(skill => skill.completed).length
  const totalSkills = skills.length
  const progressPercentage = (completedSkills / totalSkills) * 100
  const isProfessionReady = completedSkills === totalSkills

  const toggleSkill = (skillId) => {
    setSkills(prevSkills =>
      prevSkills.map(skill =>
        skill.id === skillId
          ? { ...skill, completed: !skill.completed }
          : skill
      )
    )
  }

  const getSkillPosition = (index, total) => {
    const cardWidth = 160
    const cardHeight = 100
    
    const cols = 4
    const row = Math.floor(index / cols)
    const col = index % cols
    
    const totalRows = Math.ceil(total / cols)
    const startY = -((totalRows - 1) * 130) / 2
    const startX = -((cols - 1) * 200) / 2
    
    return {
      x: startX + col * 200,
      y: startY + row * 130,
      width: cardWidth,
      height: cardHeight,
      zIndex: index + 5
    }
  }

  const handleDragStart = (e, skill) => {
    setDraggedSkill(skill)
    e.dataTransfer.setData('text/plain', skill.id)
    e.currentTarget.style.opacity = '0.8'
  }

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1'
    setDraggedSkill(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, targetSkill) => {
    e.preventDefault()
    
    if (!draggedSkill || draggedSkill.id === targetSkill.id) return

    const updatedSkills = [...skills]
    const draggedIndex = updatedSkills.findIndex(s => s.id === draggedSkill.id)
    const targetIndex = updatedSkills.findIndex(s => s.id === targetSkill.id)

    const [removedSkill] = updatedSkills.splice(draggedIndex, 1)
    updatedSkills.splice(targetIndex, 0, removedSkill)

    const reorderedSkills = updatedSkills.map((skill, index) => ({
      ...skill,
      order: index + 1
    }))

    setSkills(reorderedSkills)
  }

  return {
    profession,
    skills,
    draggedSkill,
    completedSkills,
    totalSkills,
    progressPercentage,
    isProfessionReady,
    toggleSkill,
    getSkillPosition,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  }
}