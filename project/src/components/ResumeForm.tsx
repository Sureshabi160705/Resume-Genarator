import React, { useState } from 'react';
import { ResumeData } from '../types';
import { Plus, Trash2, Download } from 'lucide-react';
import { usePDF } from 'react-to-pdf';

interface ResumeFormProps {
  initialData?: ResumeData;
  onSave: (data: ResumeData) => Promise<void>;
}

export function ResumeForm({ initialData, onSave }: ResumeFormProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(
    initialData || {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
      },
      education: [],
      experience: [],
      skills: [],
    }
  );

  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf',
  });

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          school: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
        },
      ],
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(resumeData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <button
          onClick={() => toPDF()}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div ref={targetRef} className="space-y-8 bg-white p-6 rounded-lg shadow">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={resumeData.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={resumeData.personalInfo.location}
                onChange={handlePersonalInfoChange}
                className="input-field"
              />
              <input
                type="text"
                name="title"
                placeholder="Professional Title"
                value={resumeData.personalInfo.title}
                onChange={handlePersonalInfoChange}
                className="input-field md:col-span-2"
              />
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Education</h2>
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Education
              </button>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].school = e.target.value;
                    setResumeData({ ...resumeData, education: newEducation });
                  }}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].degree = e.target.value;
                    setResumeData({ ...resumeData, education: newEducation });
                  }}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.fieldOfStudy}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].fieldOfStudy = e.target.value;
                    setResumeData({ ...resumeData, education: newEducation });
                  }}
                  className="input-field"
                />
                <div className="flex gap-4">
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEducation = [...resumeData.education];
                      newEducation[index].startDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEducation });
                    }}
                    className="input-field flex-1"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEducation = [...resumeData.education];
                      newEducation[index].endDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEducation });
                    }}
                    className="input-field flex-1"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Experience</h2>
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Experience
              </button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...resumeData.experience];
                    newExperience[index].company = e.target.value;
                    setResumeData({ ...resumeData, experience: newExperience });
                  }}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => {
                    const newExperience = [...resumeData.experience];
                    newExperience[index].position = e.target.value;
                    setResumeData({ ...resumeData, experience: newExperience });
                  }}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => {
                    const newExperience = [...resumeData.experience];
                    newExperience[index].location = e.target.value;
                    setResumeData({ ...resumeData, experience: newExperience });
                  }}
                  className="input-field"
                />
                <div className="flex gap-4">
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newExperience = [...resumeData.experience];
                      newExperience[index].startDate = e.target.value;
                      setResumeData({ ...resumeData, experience: newExperience });
                    }}
                    className="input-field flex-1"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newExperience = [...resumeData.experience];
                      newExperience[index].endDate = e.target.value;
                      setResumeData({ ...resumeData, experience: newExperience });
                    }}
                    className="input-field flex-1"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExperience = [...resumeData.experience];
                    newExperience[index].description = e.target.value;
                    setResumeData({ ...resumeData, experience: newExperience });
                  }}
                  className="input-field md:col-span-2"
                  rows={3}
                />
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <input
              type="text"
              placeholder="Add skills (comma-separated)"
              value={resumeData.skills.join(', ')}
              onChange={(e) => {
                setResumeData({
                  ...resumeData,
                  skills: e.target.value.split(',').map((skill) => skill.trim()),
                });
              }}
              className="input-field"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Resume
          </button>
        </div>
      </form>
    </div>
  );
}