// src/components/settings/subcomponents/text-field
import './styles.scss';

interface componentProps {
    placeholder?: string | undefined;
    text: string | undefined;
    setText: (value: string) => void;
}

const TextField = ({ placeholder, text, setText }: componentProps) => {

    function changeValue(value: string) {
        setText(value);
    }

    return (
        <div className='setting-subcomponent text-field'>

            <div className="setting-item">
                <div className="text-field">
                    <textarea placeholder={placeholder} value={text} onChange={(e) => changeValue(e.target.value)} />
                </div>
            </div>

        </div>
    );
}

export default TextField;