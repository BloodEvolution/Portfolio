import React, { useContext } from "react";
import { useState } from 'react';
import styled from "styled-components";

//Custom components
import TimelineExperienciaFormacao from "@/components/TimelineExperienciaFormacao";
import { useTheme } from "styled-components";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

//Styled-components
import { TitleSection, ContainerTitleSection } from "@/styles/ui";

const SectionExperiencia = styled.section`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	padding-top: 60px;
	width: 100%;
	min-height: 100vh;
`;

export default function Experiencia() {
	const { language } = useContext(SettingsContext);
	const template = language.experiencePage.timeline.template
	const jobs=language.experiencePage.timeline.jobs
	
	//const templateArray = JSON.parse(template[1])
	const templateKeys = Object.keys(template)
	const templateValues = Object.values(template)
	const jobsValue = Object.values(jobs)
	//console.log(jobsValue)
	const theme = useTheme();
	const [task, setTask] = useState('');
	const [tasksArray, setTasksArray] = useState([]);
	return (
		<SectionExperiencia id="section-experiencia">
			<ContainerTitleSection>
				<TitleSection>{language.experiencePage.title}</TitleSection>
			</ContainerTitleSection>
			{jobsValue.map((jobseval, indexjobs) => (
				<ul key={indexjobs}>
					{ templateValues.map((templateValue, indexValue) => (jobseval[templateKeys[indexValue]].length != 0 && <>
						<li>
							<span style={{ color: `${theme.colors.branding}` }}>{templateValue}: </span><span style={{ color: `${theme.colors.title}` }}>{jobseval[templateKeys[indexValue]]}</span>
						</li></>
					))}
					<br></br>
				</ul>
			))}
			{/* <TimelineExperienciaFormacao /> */}
		</SectionExperiencia >
	);
}
