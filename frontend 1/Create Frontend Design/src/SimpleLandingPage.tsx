import React from 'react';
import logoImage from './assets/35dd126ac9aa72fcdf8133bd6fcce4084523d35b.png';
import berriesImage from './assets/d3bcfaa4722b8b9ade9aa47898d0282fbaea115e.png';
import kiwiImage from './assets/26882f62512ab32566450935e038c80c30739dae.png';
import chocolateImage from './assets/d4ed2d9133e5dd2bb6c728c0d60abdbbc9057b30.png';
import cheeseImage from './assets/b340368e1324741f9ee24027dcd9fe98788ff092.png';
import dishcoveryImage from './assets/green.png';
import bowlImage from './assets/2e9da307aa8c3ad245a3f0badf9c0dd936406945.png';
import newBowlImage from './assets/image copy.png';
import newKiwiImage from './assets/image copy 2.png';
import berrieBowlImage from './assets/berrieBowl.png';
import chocoBowlImage from './assets/chocoBowl.png';
import kiviBowlImage from './assets/kiviBowl.png';
import pizzaImage from './assets/pizza.png';

const SimpleLandingPage: React.FC = () => {
  const handleIngredientClick = (ingredient: string) => {
    console.log(`${ingredient} clicked`);
    alert(`You selected ${ingredient}!`);
  };

  const handleNavClick = (section: string) => {
    console.log(`${section} clicked`);
    alert(`Navigating to ${section}`);
  };

  const handleBerryHover = () => {
    // Change main background color
    const mainDiv = document.querySelector('div[style*="backgroundColor"]') as HTMLElement;
    if (mainDiv) {
      mainDiv.style.backgroundColor = '#F89BC2';
    }
    
    // Change SVG background color
    const svgPath = document.querySelector('svg path');
    if (svgPath) {
      svgPath.setAttribute('fill', '#FF4F99');
    }
    
    // Change login button color
    const loginButton = document.querySelector('nav button:last-child');
    if (loginButton) {
      (loginButton as HTMLElement).style.backgroundColor = '#FD62A3';
    }
    
    // Change all #5B6519 color variants to #992254 with 75% transparency
    const elementsWithColor = document.querySelectorAll('[style*="#5B6519"]');
    elementsWithColor.forEach(element => {
      const currentStyle = (element as HTMLElement).style;
      // Update border color
      if (currentStyle.border && currentStyle.border.includes('#5B6519')) {
        currentStyle.border = '2px solid rgba(153, 34, 84, 0.75)';
      }
      // Update boxShadow color
      if (currentStyle.boxShadow && currentStyle.boxShadow.includes('#5B6519')) {
        currentStyle.boxShadow = currentStyle.boxShadow.replace(/#5B6519/g, 'rgba(153, 34, 84, 0.75)');
      }
      // Update backgroundColor if it's #5B6519
      if (currentStyle.backgroundColor === '#5B6519') {
        currentStyle.backgroundColor = 'rgba(153, 34, 84, 0.75)';
      }
      // Update SVG stroke colors
      const svgElements = element.querySelectorAll('svg path');
      svgElements.forEach(svgElement => {
        if (svgElement.getAttribute('stroke') === '#5B6519') {
          svgElement.setAttribute('stroke', 'rgba(153, 34, 84, 0.75)');
        }
      });
    });
    
    // Specifically target the search bar border
    const searchInput = document.querySelector('input[placeholder="Add an ingredient..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.style.border = '2px solid rgba(153, 34, 84, 0.75)';
    }
  };

  const handleBerryLeave = () => {
    // Revert main background color
    const mainDiv = document.querySelector('div[style*="backgroundColor"]') as HTMLElement;
    if (mainDiv) {
      mainDiv.style.backgroundColor = '#D8DA9D';
    }
    
    // Revert SVG background color
    const svgPath = document.querySelector('svg path');
    if (svgPath) {
      svgPath.setAttribute('fill', '#B1C050');
    }
    
    // Revert login button color
    const loginButton = document.querySelector('nav button:last-child');
    if (loginButton) {
      (loginButton as HTMLElement).style.backgroundColor = '#B1C050';
    }
    
    // Revert all #992254 color variants back to #5B6519
    const elementsWithColor = document.querySelectorAll('[style*="rgba(153, 34, 84, 0.75)"]');
    elementsWithColor.forEach(element => {
      const currentStyle = (element as HTMLElement).style;
      // Update border color
      if (currentStyle.border && currentStyle.border.includes('rgba(153, 34, 84, 0.75)')) {
        currentStyle.border = '2px solid #5B6519';
      }
      // Update boxShadow color
      if (currentStyle.boxShadow && currentStyle.boxShadow.includes('rgba(153, 34, 84, 0.75)')) {
        currentStyle.boxShadow = currentStyle.boxShadow.replace(/rgba\(153, 34, 84, 0\.75\)/g, '#5B6519');
      }
      // Update backgroundColor if it's rgba(153, 34, 84, 0.75)
      if (currentStyle.backgroundColor === 'rgba(153, 34, 84, 0.75)') {
        currentStyle.backgroundColor = '#5B6519';
      }
      // Update SVG stroke colors
      const svgElements = element.querySelectorAll('svg path');
      svgElements.forEach(svgElement => {
        if (svgElement.getAttribute('stroke') === 'rgba(153, 34, 84, 0.75)') {
          svgElement.setAttribute('stroke', '#5B6519');
        }
      });
    });
    
    // Specifically target the search bar border
    const searchInput = document.querySelector('input[placeholder="Add an ingredient..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.style.border = '2px solid #5B6519';
    }
  };

  return (
    <div style={{
      backgroundColor: '#D8DA9D',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      {/* Decorative SVG at Top Left */}
      <svg
        width="1497"
        height="942"
        viewBox="0 0 1497 942"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: 0
        }}
      >
        <path d="M0 0H1497V0C1497 36.2294 1471.21 67.3272 1435.61 74.0296L1346.3 90.8418C1271.15 104.989 1221.86 177.582 1236.43 252.651V252.651C1249.72 321.142 1209.77 388.772 1143.37 410.186L1103.24 423.126C1037.84 444.218 995.131 507.06 999.598 575.637L1001.56 605.794C1006.62 683.425 951.487 752.038 874.588 763.815L775.173 779.041C747.604 783.263 721.759 795.088 700.539 813.187L592.016 905.751C543.986 946.718 475.448 953.229 420.564 922.04L301.183 854.2C263.911 833.02 218.199 833.212 181.107 854.704V854.704C100.687 901.302 0 843.274 0 750.33V0Z" fill="#B1C050" fillOpacity="0.75" />
      </svg>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        width: '100%',
        paddingRight: '50px'
      }}>
        <div
          style={{
            width: '150px',
            height: '150px',
            cursor: 'pointer'
          }}
          onClick={() => handleNavClick('Home')}
          title="Dishcovery Home"
        >
          <img
            src={logoImage}
            alt="Dishcovery Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '50px', marginLeft: 'auto' }}>
          <button
            onClick={() => handleNavClick('Home')}
            style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('Pricing')}
            style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Pricing
          </button>
          <button
            onClick={() => handleNavClick('Login')}
            style={{
              backgroundColor: '#B1C050',
              height: '52px',
              borderRadius: '40px',
              boxShadow: '0px 10px 15px 0px #5B6519',
              border: 'none',
              color: 'white',
              fontSize: '22px',
              padding: '0 30px',
              cursor: 'pointer'
            }}
          >
            LOGIN
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        marginTop: '55px',
        position: 'relative',
        marginLeft: '-1000px'
      }}>
        <div style={{
          width: '508px',
          height: '128px',
          margin: '0 auto 30px',
        }}>
          <img
            src={dishcoveryImage}
            alt="Dishcovery"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <p style={{
          fontSize: '24px',
          maxWidth: '800px',
          margin: '0 auto 50px',
          lineHeight: '1.5'
        }}>
          Dishcovery – Turning "what's for dinner?" into "wow, that's dinner?!"
          <br />
          An AI-powered recipe matchmaker that helps you cook what you love with what you have.
          No stress, just tasty success!
        </p>

        {/* Ingredient Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          margin: '50px auto',
          maxWidth: '600px'
        }}>
          <div style={{
            position: 'relative',
            width: '70%'
          }}>
            <input
              type="text"
              placeholder="Add an ingredient..."
              style={{
                padding: '12px 60px 12px 20px',
                fontSize: '18px',
                borderRadius: '30px',
                border: '2px solid #5B6519',
                outline: 'none',
                width: '100%',
                boxShadow: '0px 5px 10px 0px #5B6519'
              }}
            />
            <button
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '5px'
              }}
              title="Add ingredient image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19Z" stroke="#5B6519" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#5B6519" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 15L16 10L5 21" stroke="#5B6519" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <button
            style={{
              backgroundColor: '#5B6519',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              padding: '12px 30px',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0px 5px 10px 0px #5B6519'
            }}
          >
            Add
          </button>
        </div>

        {/* Ingredients */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '50px',
          flexWrap: 'wrap'
        }}>
          <button
            onMouseEnter={() => {
              // Spin the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(90deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(90deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(90deg)';
              }
              
              // Add berry hover effects
              handleBerryHover();
            }}
            onMouseLeave={() => {
              // Reset the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(0deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(0deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(0deg)';
              }
              
              // Remove berry hover effects
              handleBerryLeave();
            }}
            onClick={() => handleIngredientClick('Berries')}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#e74c3c',
              boxShadow: '0px 15px 25px 0px #5B6519',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 0,
              margin: 0
            }}
            title="Berries ingredient"
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={berriesImage}
                alt="Berries"
                style={{
                  width: '120%',
                  height: '120%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  marginLeft: '-10%',
                  marginTop: '-10%',
                  position: 'relative',
                  left: '5px',
                  top: '5px'
                }}
              />
            </div>
          </button>

          <button
            onMouseEnter={() => {
              // Spin the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(180deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(180deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(180deg)';
              }
            }}
            onMouseLeave={() => {
              // Reset the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(0deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(0deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(0deg)';
              }
            }}
            onClick={() => handleIngredientClick('Kiwi')}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#27ae60',
              boxShadow: '0px 15px 25px 0px #5B6519',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 0,
              margin: 0
            }}
            title="Kiwi ingredient"
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={cheeseImage}
                alt="Cheese"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          </button>

          <button
            onMouseEnter={() => {
              // Spin the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(270deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(270deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(270deg)';
              }
            }}
            onMouseLeave={() => {
              // Reset the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(0deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(0deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(0deg)';
              }
            }}
            onClick={() => handleIngredientClick('Chocolate')}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#7d3c98',
              boxShadow: '0px 15px 25px 0px #5B6519',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 0,
              margin: 0
            }}
            title="Chocolate ingredient"
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={chocolateImage}
                alt="Chocolate"
                style={{
                  width: '140%',
                  height: '140%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  marginLeft: '-20%',
                  marginTop: '-20%',
                  position: 'relative',
                  left: '10px',
                  top: '10px'
                }}
              />
            </div>
          </button>

          <button
            onMouseEnter={() => {
              // Spin the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(360deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(360deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(360deg)';
              }
            }}
            onMouseLeave={() => {
              // Reset the table, plates container, and central frame
              const tableFrame = document.getElementById('table-frame');
              const platesContainer = document.getElementById('plates-container');
              const centralFrame = document.getElementById('central-frame');

              if (tableFrame) {
                tableFrame.style.transform = 'rotate(0deg)';
              }

              if (platesContainer) {
                platesContainer.style.transform = 'rotate(0deg)';
              }

              if (centralFrame) {
                centralFrame.style.transform = 'rotate(0deg)';
              }
            }}
            onClick={() => handleIngredientClick('Cheese')}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#f1c40f',
              boxShadow: '0px 15px 25px 0px #5B6519',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 0,
              margin: 0
            }}
            title="Cheese ingredient"
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={kiwiImage}
                alt="Kiwi"
                style={{
                  width: '120%',
                  height: '120%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  marginLeft: '-10%',
                  marginTop: '-10%',
                  position: 'relative',
                  left: '7px',
                  top: '5px'
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Combined table and central frame container */}
      <div
        id="table-container"
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '50px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Table (bigger circular frame) - 800px positioned absolutely to overlap center with bottom right corner */}
        <div
          id="table-frame"
          style={{
            position: 'fixed',
            bottom: '-400px',
            right: '-400px',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            backgroundColor: '#FD62A3',
            zIndex: 3,
            transition: 'transform 1.5s ease'
          }}
        ></div>

        {/* Central bigger circular frame (400px) - centered within plates container */}
        <div
          id="central-frame"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: '#FD62A3',
            zIndex: 5,
            transition: 'transform 1.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        </div>

        {/* Plates container - 500px */}
        <div
          id="plates-container"
          style={{
            position: 'fixed',
            bottom: '-250px',
            right: '-250px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            zIndex: 6,
            transition: 'transform 1.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Plate 1 - Kivi Bowl - increased to 600px and shifted to 300px from center */}
          <div
            id="plate-1"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translate(-300px, -300px)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 1.5s ease',
              zIndex: 7,
              overflow: 'hidden'
            }}
          >
            <img
              src={kiviBowlImage}
              alt="Kivi Bowl"
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative',
                top: '38px'
              }}
            />
          </div>

          {/* Plate 2 - Chocolate Bowl - increased to 500px and shifted to 300px from center */}
          <div
            id="plate-2"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translate(300px, -300px)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 1.5s ease',
              zIndex: 7,
              overflow: 'hidden'
            }}
          >
            <img
              src={chocoBowlImage}
              alt="Chocolate Bowl"
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative',
                top: '38px'
              }}
            />
          </div>

          {/* Plate 3 - Berrie Bowl - increased to 500px and shifted to 300px from center */}
          <div
            id="plate-3"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translate(-300px, 300px)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 1.5s ease',
              zIndex: -1,
              overflow: 'hidden'
            }}
          >
            <img
              src={berrieBowlImage}
              alt="Berrie Bowl"
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative',
                top: '38px'
              }}
            />
          </div>

          {/* Plate 4 - Pizza - increased to 200px and shifted to 300px from center */}
          <div
            id="plate-4"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translate(300px, 300px)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 1.5s ease',
              zIndex: 7,
              overflow: 'hidden'
            }}
          >
            <img
              src={pizzaImage}
              alt="Pizza"
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative',
                top: '38px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLandingPage;