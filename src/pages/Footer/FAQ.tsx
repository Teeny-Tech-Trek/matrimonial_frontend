import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string | string[];
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is a matrimonial service?",
    answer: "A platform that helps boys and girls or their families find suitable life partners based on compatibility, background, and values."
  },
  {
    id: 2,
    question: "Who can register?",
    answer: "Any unmarried, widowed, or divorced person of legal marriageable age can register. Parents may also register on behalf of their children."
  },
  {
    id: 3,
    question: "What information is required?",
    answer: "Basic personal, educational, and family details along with partner preferences and a recent photograph."
  },
  {
    id: 4,
    question: "How are matches suggested?",
    answer: "Matches are offered on the basis of education, job, family background, lifestyle, and personal preferences."
  },
  {
    id: 5,
    question: "Are my details kept confidential?",
    answer: "Yes. All profiles are handled with complete privacy and shared only after mutual consent."
  },
  {
    id: 6,
    question: "Is counseling or guidance provided?",
    answer: "Yes. Expert advisors guide families and individuals for better understanding and successful marriages."
  },
  {
    id: 7,
    question: "What are Pre-Wedding and Post-Wedding Courses?",
    answer: "Special programs to help couples and families develop mutual understanding, communication, and adjustment for a happy married life."
  },
  {
    id: 8,
    question: "What if the first few matches don't work out?",
    answer: "No need to worry. More matches are provided till suitable compatibility is found."
  },
  {
    id: 9,
    question: "Is there any fee?",
    answer: "Yes, a reasonable service charge depending on the type of plan — basic or personalized."
  },
  {
    id: 10,
    question: "Can divorced or widowed individuals register?",
    answer: "Certainly. We assist all deserving individuals seeking a fresh start in life."
  },
  {
    id: 11,
    question: "What makes a good match?",
    answer: "Mutual respect, emotional maturity, and family values — more than money or status — make marriages last."
  },
  {
    id: 12,
    question: "Why do some matches fail?",
    answer: "Because true success in marriage depends on understanding, patience, and communication, not only on data matching."
  },
  {
    id: 13,
    question: "What is the purpose of a matrimonial service?",
    answer: "A matrimonial service helps families and individuals find suitable life partners by matching profiles based on compatibility, values, education, profession, and family background."
  },
  {
    id: 13,
    question: "What is the purpose of a matrimonial service?",
    answer: "A matrimonial service helps families and individuals find suitable life partners by matching profiles based on compatibility, values, education, profession, and family background."
  },
  {
    id: 14,
    question: "Who can register for matrimonial services?",
    answer: "Any unmarried, widowed, divorced, or separated individual of legal marriageable age (as per Indian law — 18 years for females, 21 years for males) can register."
  },
  {
    id: 15,
    question: "What details are required for registration?",
    answer: [
      "Full name and contact information",
      "Date of birth, height, and complexion",
      "Educational and professional details",
      "Family background",
      "Preferences for the desired partner",
      "Recent photograph"
    ]
  },
  {
    id: 16,
    question: "How are matches selected or suggested?",
    answer: [
      "Matches are suggested based on compatibility parameters such as:",
      "Education and profession",
      "Religion and caste (if desired)",
      "Age and height preferences",
      "Family status and values",
      "Personal interests and lifestyle"
    ]
  },
  {
    id: 17,
    question: "Are the details of registered members kept confidential?",
    answer: "Yes. All information is kept strictly confidential and shared only with genuine and compatible prospects after mutual consent."
  },
  {
    id: 18,
    question: "Can parents or guardians register on behalf of their son or daughter?",
    answer: "Yes. Parents and guardians often handle registration and communication for their children."
  },
  {
    id: 19,
    question: "Do you provide counseling or guidance services?",
    answer: "Yes. Professional matrimonial advisors or counselors guide families and candidates about compatibility, communication, and decision-making for successful marriages."
  },
  {
    id: 20,
    question: "What are 'Pre-Wedding' and 'Post-Wedding' courses?",
    answer: [
      "These are special guidance programs designed to help couples and families:",
      "Understand marital responsibilities",
      "Improve mutual understanding and emotional bonding",
      "Learn family adjustment and communication skills",
      "Manage conflicts maturely"
    ]
  },
  {
    id: 21,
    question: "What if the first few matches do not work out?",
    answer: "It is common. Compatibility takes time. The service continues to suggest more matches until a suitable one is found."
  },
  {
    id: 22,
    question: "Is there a fee for registration or consultation?",
    answer: "Yes. Registration or consultation fees depend on the type of service—basic, premium, or personalized. Details are provided during registration."
  },
  {
    id: 23,
    question: "Do you verify the profiles?",
    answer: "Efforts are made to verify educational, professional, and family details through documents and references to ensure authenticity."
  },
  {
    id: 24,
    question: "What qualities make a good matrimonial match?",
    answer: "Mutual understanding, respect, emotional maturity, family values, and compatibility in goals and lifestyle are key to a successful marriage."
  },
  {
    id: 25,
    question: "How long does the matchmaking process take?",
    answer: "It varies from person to person. Some matches succeed within weeks, while others may take months based on preferences and availability of suitable profiles."
  },
  {
    id: 26,
    question: "Can divorced or widowed individuals register again?",
    answer: "Yes. Matrimonial services welcome second marriages and provide specialized counseling for such cases."
  },
  {
    id: 27,
    question: "Why do some matches fail even after best efforts?",
    answer: "Because success in marriage depends not only on matching data but also on emotional compatibility, mutual respect, and open communication between partners."
  }
];

const FAQComponent: React.FC = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const renderAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return (
        <div>
          <p className="text-gray-600 leading-relaxed mb-2">{answer[0]}</p>
          <ul className="list-disc ml-5 space-y-2">
            {answer.slice(1).map((item, index) => (
              <li key={index} className="text-gray-600 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <p className="text-gray-600 leading-relaxed">{answer}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-lg">Matrimonial Services</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-rose-50 transition-colors duration-300"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 pr-4">
                  <span className="text-rose-600 font-bold mr-2">{faq.id}.</span>
                  {faq.question}
                </h3>
                <span
                  className={`text-2xl text-rose-600 transform transition-transform duration-300 flex-shrink-0 ${
                    activeId === faq.id ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeId === faq.id
                    ? 'max-h-96 opacity-100 px-6 pb-5'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                {renderAnswer(faq.answer)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;