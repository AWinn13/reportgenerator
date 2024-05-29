import React from 'react'
import { sectionFourFields } from '../assets/fieldConfig';


const SectionFour =({formData, handleChange}) => {
  return (
    <div>
      <h2>Section Four</h2>
      {sectionFourFields.map((field) => (
        <div className="field" key={field.name}>
          <label className="label">{field.label}</label>
          <div className="control">
            {field.type === 'select' ? (
              <div className="select">
                <select name={field.name} value={formData[field.name]} onChange={handleChange}>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : field.type === 'textarea' ? (
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


export default SectionFour