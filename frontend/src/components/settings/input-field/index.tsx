// src/components/settings/subcomponents/input-field
import './styles.scss';

// import subcomponents
import ItemTitle from '../../shared/info-button'

interface componentProps {
    title?: string; 
    info?: string;
    placeholder?: string | undefined;
    input: string | undefined;
    invalid?: boolean;
    setInput: (value?: string) => void;
}

const InputField = ({ title, info, placeholder, input, invalid, setInput }: componentProps) => {

    function changeValue(value: string) {
        setInput(value === "" ? undefined : value);
    }

    return (
        <div className='setting-subcomponent input-field'>

            <div className="setting-item">
                <ItemTitle title={title} info={info}></ItemTitle>
                <div className={`input-field ${invalid ? ' invalid' : ''}`}>
                    <input type="text" placeholder={placeholder} value={input} onChange={(e) => changeValue(e.target.value)} />
                </div>
            </div>

        </div>
    );
}

export default InputField;