// src/components/settings/subcomponents/text-field
import './styles.scss';

// components:
import InfoButton from '../../shared/info-button';

interface componentProps {
    title?: string;
    info?: string;
    placeholder?: string | undefined;
    text: string | undefined;
    invalid?: boolean;
    setText: (value?: string) => void;
}

const TextField = ({ title, info, placeholder, text, invalid, setText }: componentProps) => {

    function changeValue(value: string) {
        setText(value === "" ? undefined : value);
    }

    return (
        <div className='setting-subcomponent text-field'>

            <div className="setting-item">
                <InfoButton title={title} info={info} />
                <div className={`text-field${invalid ? ' invalid' : ''}`}>
                    <textarea placeholder={placeholder} value={text ?? ''} onChange={(e) => changeValue(e.target.value)} />
                </div>
            </div>

        </div>
    );
}

export default TextField;