export const submitOnboardingData = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}