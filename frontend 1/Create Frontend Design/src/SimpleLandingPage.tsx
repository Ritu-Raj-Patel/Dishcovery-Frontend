import React from 'react';
import logoImage from './assets/35dd126ac9aa72fcdf8133bd6fcce4084523d35b.png';
import berriesImage from './assets/d3bcfaa4722b8b9ade9aa47898d0282fbaea115e.png';
import kiwiImage from './assets/26882f62512ab32566450935e038c80c30739dae.png';
import chocolateImage from './assets/d4ed2d9133e5dd2bb6c728c0d60abdbbc9057b30.png';
import cheeseImage from './assets/b340368e1324741f9ee24027dcd9fe98788ff092.png';
import dishcoveryImage from './assets/image.png';
import bowlImage from './assets/2e9da307aa8c3ad245a3f0badf9c0dd936406945.png';
import newBowlImage from './assets/image copy.png';

const SimpleLandingPage: React.FC = () => {
  const handleIngredientClick = (ingredient: string) => {
    console.log(`${ingredient} clicked`);
    alert(`You selected ${ingredient}!`);
  };

  const handleNavClick = (section: string) => {
    console.log(`${section} clicked`);
    alert(`Navigating to ${section}`);
  };

  return (
    <div style={{ 
      backgroundColor: '#f89bc2', 
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
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
              backgroundColor: 'rgba(253,98,163,0.69)',
              height: '52px',
              borderRadius: '40px',
              boxShadow: '0px 10px 15px 0px #992254',
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
        marginTop: '150px',
        position: 'relative',
        marginLeft: '-950px'
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
          <input
            type="text"
            placeholder="Add an ingredient..."
            style={{
              padding: '12px 20px',
              fontSize: '18px',
              borderRadius: '30px',
              border: '2px solid #992254',
              outline: 'none',
              width: '70%',
              boxShadow: '0px 5px 10px 0px #992254'
            }}
          />
          <button
            style={{
              backgroundColor: 'rgba(253,98,163,0.69)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              padding: '12px 30px',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0px 5px 10px 0px #992254'
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
            onClick={() => handleIngredientClick('Berries')}
            style={{ 
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#e74c3c',
              boxShadow: '0px 15px 25px 0px #992254',
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
                  marginLeft: '-8%',
                  marginTop: '-10%',
                  position: 'relative',
                  left: '7px',
                  top: '5px'
                }} 
              />
            </div>
          </button>
          
          <button 
            onClick={() => handleIngredientClick('Kiwi')}
            style={{ 
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#27ae60',
              boxShadow: '0px 15px 25px 0px #992254',
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
          
          <button 
            onClick={() => handleIngredientClick('Chocolate')}
            style={{ 
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#7d3c98',
              boxShadow: '0px 15px 25px 0px #992254',
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
            onClick={() => handleIngredientClick('Cheese')}
            style={{ 
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#f1c40f',
              boxShadow: '0px 15px 25px 0px #992254',
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
        </div>
      </div>
      
      {/* Circular Bowl Image at Bottom Right */}
      <div style={{
        position: 'fixed',
        bottom: '-350px',
        right: '-350px',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        backgroundColor: '#FD62A3',
        zIndex: 4
      }}></div>
      
      {/* Circular Bowl Image at Bottom Right */}
      <div style={{
        position: 'fixed',
        bottom: '50px',
        right: '50px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        overflow: 'hidden',
        zIndex: 5
      }}>
        <img 
          src={newBowlImage} 
          alt="Bowl" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }} 
        />
      </div>
    </div>
  );
};

export default SimpleLandingPage;