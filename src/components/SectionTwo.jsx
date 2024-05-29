import React from 'react'
import { sectionTwoFields } from '../assets/fieldConfig';

const SectionTwo = ({formData, handleChange}) => {
  return (
    <div>
      {sectionTwoFields.map((field) => (
        <div className="field" key={field.name}>
          <label htmlFor={field.name} className="label" >{field.label}</label>
          <div className="control">
            {field.type === 'textarea' ? (
              <textarea
                className="textarea"
                placeholder={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                id={field.name}
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

export default SectionTwo