import React from 'react'
import { sectionThreeFields } from '../assets/fieldConfig';


const SectionThree =({formData, handleChange}) => {
  return (
    <div>
    {sectionThreeFields.map((field) => (
      <div className="field" key={field.name}>
        <label className="label">{field.label}</label>
        <div className="control">
          {field.type === 'textarea' ? (
            <textarea
              className="textarea"
              placeholder={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ) : (
            <input
              className="input"
              type={field.type}
              placeholder={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    ))}
  </div>
  )
}


export default SectionThree