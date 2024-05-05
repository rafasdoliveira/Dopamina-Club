import styles from './input.module.scss'

// eslint-disable-next-line react/prop-types
const Input = ({src, type, id, placeholder, value, onChange, disabled, required}) => {
    
    const classMap = {
        'atividade': styles.secondaryInput,
        'cadastro': styles.tertiaryInput,
        'login': styles.quartiaryInput,
    }

    const inputClass = classMap[id] || styles.primaryInput
    
    return (
        <div className={inputClass}>
            <img srcSet={src} alt=""/>
            <input type={type} name={id} id={id} placeholder={placeholder} value={value} required={required ? true : false} onChange={onChange} disabled={disabled}/>
        </div>
  )
}

export default Input
