import { useEffect, useState } from "react";
import { authorService } from "../../../service/authorService";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const LanguageCheckbox = ({fullLanguageList, nativeLanguage}: {fullLanguageList: string[], nativeLanguage: string}) =>
{
    const [languagesMap, setLanguagesMap] = useState<Record<string, boolean>>({});

    const mapConvertion = (languages: string[]) => {
        return languages.reduce((acumulator, language) => {
          acumulator[language] = false;
          return acumulator;
        }, {} as Record<string, boolean>);
    };

    const mapSetter = (map: Record<string, boolean>, list: string[]) => {
        list.forEach((language) => {
          if (map.hasOwnProperty(language)) {
            map[language] = true;
          }
        });

        if (map.hasOwnProperty(nativeLanguage)) {
            map[nativeLanguage] = true;
        }
    };
      
    const getLanguages = async () => {
        const languages = await authorService.getIdiomas()
        const languagesMap = mapConvertion(languages)
        mapSetter(languagesMap, fullLanguageList)
        setLanguagesMap(languagesMap)
    };

    useEffect(() => {
        getLanguages();
    }, []);

    
    const getSelectedLanguages = () => {
        return Object.keys(languagesMap).filter((language) => languagesMap[language]);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setLanguagesMap((prevMap) => ({
            ...prevMap,
            [name]: checked,
        }));
        fullLanguageList = getSelectedLanguages()
    };

    

    return (
        <>
        <Box>
            <FormGroup sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                {Object.entries(languagesMap).map(([language, isChecked]) => (
                    <FormControlLabel
                        key={language}
                        control={
                            <Checkbox
                                checked={isChecked}
                                onChange={handleChange}
                                name={language}
                                disabled={language === nativeLanguage}
                            />
                        }
                        label={language}
                    />
                ))}
            </FormGroup>
        </Box>
        </>
    );
};