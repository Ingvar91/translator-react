import React, { FC, useEffect, useState } from "react";
import { TranslateAPI } from "../services/TranslateService";
import Textarea from "../ui-kit/textarea/textarea";
import Button from "../ui-kit/button/button";
import Dropdown from "../ui-kit/dropdown/dropdown";
import DropdownItem from "../ui-kit/dropdown/dropdown-item";
import { Countries, CountriesCode, Country } from "./translator.model";
import styles from "./translator.module.scss";
import { useDebounce } from "../hooks/debounce";
import Icon from "../ui-kit/icon/icon";
import { IconChevronDown } from "../ui-kit/icon/icons/iconChevronDown";
import CopyText from "../ui-kit/copy-text/copy-text";
import Spin from "../ui-kit/spin/spin";

const Translator: FC = () => {
  const maxLengthTextarea = 300; // максимальное количество символов в текстовом поле
  const [skip, setSkip] = useState(true);
  const [text, setText] = useState(""); // текст в поле ввода
  const [country, setCountry] = useState<Country | null>(
    Countries.find((f) => f.code === CountriesCode.en) || null
  );
  const [open, setOpen] = useState(false); // состояние dropdown, по умолчанию закрыт
  const [resultTranslate, setResultTranslate] = useState(""); // переведенный текст
  const debounceText = useDebounce(text, 300); // задержка ввода текста перед отправкой на сервер
  const { data: translate, isFetching } = TranslateAPI.useFetchTranslateQuery(
    { text: debounceText, to: country?.code || CountriesCode.en },
    { skip }
  );
  const iconChevronDown = IconChevronDown;

  useEffect(() => {
    setResultTranslate(translate || "");
  }, [translate]);

  useEffect(() => {
    if (debounceText?.length && skip) {
      setSkip(false);
    }
  }, [debounceText, skip]);

  const onTextarea = (text: string) => {
    setText(text);
  };

  // выбрать язык и скрыть dropdown
  const onSelectLang = (country: Country) => {
    setCountry(country);
    setOpen(false);
  };

  // показать dropdown
  const onVisibleChange = (visible: boolean) => {
    setOpen(visible);
  };

  // очистить textarea и поле перевода
  const onClear = () => {
    setText('');
  };

  // вставить текст из буфера в поле
  const onBuffer = () => {
    navigator.clipboard.readText().then((text: string) => {
      text = String(text).substring(0, maxLengthTextarea);
      if (text?.length) {
        setText(text);
      }
    });
  };

  return (
    <div className={styles.translator_container}>
      <div>{process.env.REACT_APP_SECRET_KEY}</div>
      <div className={styles.translator}>
        <div className={styles.translator_textarea}>
          <Textarea change={onTextarea} text={text} maxLength={maxLengthTextarea}/>
          <div className={styles.translator_textarea_control}>
            <Button
              click={onBuffer}
              outline="secondary"
              text="Вставить из буфера"
            />
            <Button click={onClear} type="danger" text="Очистить" />
          </div>
        </div>
        <div className={styles.translator_output}>
          <Dropdown
            fillWidth={true}
            visible={open}
            visibleChange={onVisibleChange}
            target={
              <div className={styles.translator_output_control}>
                <div className={styles.translator_output_name}>
                  Текущий язык: {country?.name}
                  <Icon
                    className={styles.translator_output_icon_lang}
                    icon={country?.icon}
                  />
                </div>
                <div>
                  <Icon
                    className={open ? styles.translator_output_rotate : ""}
                    icon={iconChevronDown}
                  />
                </div>
              </div>
            }
          >
            {Countries.map((item) => (
              <DropdownItem key={item.code} click={() => onSelectLang(item)}>
                <div className={styles.translator_dropdown}>
                  <div className={styles.translator_dropdown_name}>
                    {item.name}
                  </div>
                  <Icon icon={item.icon} />
                </div>
              </DropdownItem>
            ))}
          </Dropdown>
          <div className={styles.translator_output_content}>
            <div className={styles.translator_output_text}>
              {isFetching ? <Spin fontSize={1.6} /> : resultTranslate}
            </div>
            <div>
              <CopyText text={resultTranslate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Translator;
