// src/components/settings/subcomponents/input-field
import './styles.scss';

// import subcomponents
import ItemTitle from '../../shared/info-button'

interface componentProps {
    title?: string; 
    info?: string;
    placeholder?: string | undefined;
    input: string | undefined;
    setInput: (value: string) => void;
}

const InputField = ({ title, info, placeholder, input, setInput }: componentProps) => {

    function changeValue(value: string) {
        setInput(value);
    }

    return (
        <div className='setting-subcomponent input-field'>

            <div className="setting-item">
                <ItemTitle title={title} info={info}></ItemTitle>
                <div className="input-field">
                    <input type="text" placeholder={placeholder} value={input} onChange={(e) => changeValue(e.target.value)} />
                </div>
            </div>

        </div>
    );
}

export default InputField;