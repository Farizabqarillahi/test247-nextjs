import Header from '../components/Header';
import Footer from '../components/Footer';
import TabPanel from '../components/TabPanel';
import WordCountTab from '../components/WordCountTab';
import BoxGeneratorTab from '../components/BoxGeneratorTab';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className=" flex-auto container mx-auto p-1">
        <TabPanel>
          <WordCountTab label="Word Count" />
          <BoxGeneratorTab label="Box Generator" />
        </TabPanel>
      </main>
      <Footer />
    </div>
  );
}
